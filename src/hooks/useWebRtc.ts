import { useCallback, useEffect, useRef, useState } from "react";
import { getSocket } from "@services/socket/socket";

type UseWebRTCArgs = {
  userId: string;
  targetUserId: string;
  onCallEnded?: () => void;
};

export const useWebRTC = ({
  userId,
  targetUserId,
  onCallEnded,
}: UseWebRTCArgs) => {
  const socketRef = useRef(getSocket());
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);

  const [isInCall, setIsInCall] = useState(false);
  const [incomingCall, setIncomingCall] = useState<{
    fromUserId: string;
    fromName: string;
  } | null>(null);

  //Helper: Clean up old PeerConnection completely
  const cleanupPeerConnection = useCallback(() => {
    const pc = pcRef.current;
    if (pc) {
      try {
        pc.ontrack = null;
        pc.onicecandidate = null;
        pc.close();
      } catch {}
    }
    pcRef.current = null;
    pendingCandidatesRef.current = [];
    remoteStreamRef.current = null;
  }, []);

  //Create new RTCPeerConnection
  const createPeer = useCallback(() => {
    cleanupPeerConnection();

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socketRef.current.emit("ice-candidate", {
          userId,
          targetUserId,
          candidate: e.candidate.toJSON(),
        });
      }
    };

    pc.ontrack = (e) => {
      if (!remoteStreamRef.current) {
        remoteStreamRef.current = new MediaStream();
      }

      e.streams[0].getTracks().forEach((track) => {
        if (!remoteStreamRef.current!.getTracks().includes(track)) {
          remoteStreamRef.current!.addTrack(track);
        }
      });

      // Notify UI to refresh remote video
      window.dispatchEvent(new Event("remoteStreamReady"));
    };

    pcRef.current = pc;
    return pc;
  }, [cleanupPeerConnection, userId, targetUserId]);

  //Get or create local media stream
  const ensureLocalStream = useCallback(async () => {
    if (!localStreamRef.current) {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
    }
    return localStreamRef.current;
  }, []);

  // Caller starts a call
  // Start a new call (caller)
  const startCall = useCallback(async () => {
    if (!userId || !targetUserId) return;

    const socket = socketRef.current;

    // 🧹 Hard reset before any new call
    if (pcRef.current) {
      try {
        pcRef.current.ontrack = null;
        pcRef.current.onicecandidate = null;
        pcRef.current.close();
      } catch {}
    }
    pcRef.current = createPeer();
    pendingCandidatesRef.current = [];
    remoteStreamRef.current = null;

    const pc = pcRef.current!;
    const local = await ensureLocalStream();

    // Attach local tracks *after* fresh peer exists
    local.getTracks().forEach((t) => pc.addTrack(t, local));

    // Create SDP offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("start-call", {
      fromUserId: userId,
      toUserId: targetUserId,
      fromName: userId,
    });

    socket.emit("rtc-offer", {
      userId,
      targetUserId,
      sdp: offer,
    });

    setIsInCall(true);
  }, [userId, targetUserId, createPeer, ensureLocalStream]);

  // Callee handles incoming offer → create answer
  // Handle offer (callee)
  const handleOffer = useCallback(
    async (sdp: RTCSessionDescriptionInit) => {
      if (!userId || !targetUserId) return;

      // Always destroy old peer completely
      if (pcRef.current) {
        try {
          pcRef.current.ontrack = null;
          pcRef.current.onicecandidate = null;
          pcRef.current.close();
        } catch {}
      }
      pcRef.current = createPeer();
      pendingCandidatesRef.current = [];
      remoteStreamRef.current = null;

      const pc = pcRef.current!;
      const local = await ensureLocalStream();

      // Add local tracks only once
      local.getTracks().forEach((t) => pc.addTrack(t, local));

      // Apply remote offer
      await pc.setRemoteDescription(new RTCSessionDescription(sdp));

      // Drain queued ICE candidates (if any)
      while (pendingCandidatesRef.current.length > 0) {
        const candidate = pendingCandidatesRef.current.shift();
        try {
          await pc.addIceCandidate(candidate!);
        } catch (e) {
          console.warn("Failed to add queued ICE:", e);
        }
      }

      // Create answer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socketRef.current.emit("rtc-answer", {
        userId,
        targetUserId,
        sdp: answer,
      });

      setIsInCall(true);
      setIncomingCall(null);
    },
    [createPeer, ensureLocalStream, userId, targetUserId]
  );

  // Caller receives answer
  const handleAnswer = useCallback(async (sdp: RTCSessionDescriptionInit) => {
    const pc = pcRef.current;
    if (!pc || pc.signalingState === "closed") return;
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));

    // Drain ICE candidates
    while (pendingCandidatesRef.current.length > 0) {
      const candidate = pendingCandidatesRef.current.shift();
      try {
        await pc.addIceCandidate(candidate!);
      } catch (e) {
        console.warn("Failed to add queued ICE:", e);
      }
    }
  }, []);

  //Handle ICE
  const handleRemoteIce = useCallback(
    async (candidate: RTCIceCandidateInit) => {
      const pc = pcRef.current;
      if (!candidate) return;

      if (!pc || pc.signalingState === "closed") {
        // console.log("Queue ICE - PC not ready");
        pendingCandidatesRef.current.push(candidate);
        return;
      }

      if (pc.remoteDescription && pc.remoteDescription.type) {
        try {
          await pc.addIceCandidate(candidate);
        } catch (e) {
          console.error("addIceCandidate error:", e);
        }
      } else {
        pendingCandidatesRef.current.push(candidate);
      }
    },
    []
  );

  // End call safely
  const endCall = useCallback(() => {
    socketRef.current.emit("end-call", { userId, targetUserId });

    // stop all tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }

    cleanupPeerConnection();
    setIsInCall(false);
    onCallEnded?.();
  }, [cleanupPeerConnection, userId, targetUserId, onCallEnded]);

  // Socket event bindings
  useEffect(() => {
    const socket = socketRef.current;

    const onOffer = async ({ sdp, from }: any) => {
      if (from && from !== userId) {
        await socket.emit("join-call", { userId, targetUserId });
        await handleOffer(sdp);
      }
    };

    const onAnswer = async ({ sdp }: any) => await handleAnswer(sdp);
    const onIce = async ({ candidate }: any) =>
      await handleRemoteIce(candidate);
    const onEnded = () => endCall();
    const onIncomingCall = ({ fromUserId, fromName }: any) => {
      // console.log("Incoming call from:", fromName);
      setIncomingCall({ fromUserId, fromName });
    };

    socket.on("rtc-offer", onOffer);
    socket.on("rtc-answer", onAnswer);
    socket.on("ice-candidate", onIce);
    socket.on("call-ended", onEnded);
    socket.on("incoming-call", onIncomingCall);

    return () => {
      socket.off("rtc-offer", onOffer);
      socket.off("rtc-answer", onAnswer);
      socket.off("ice-candidate", onIce);
      socket.off("call-ended", onEnded);
      socket.off("incoming-call", onIncomingCall);
    };
  }, [
    handleOffer,
    handleAnswer,
    handleRemoteIce,
    endCall,
    userId,
    targetUserId,
  ]);

  return {
    isInCall,
    incomingCall,
    startCall,
    endCall,
    acceptCall: () => {
      if (!incomingCall) return;
      socketRef.current.emit("accept-call", {
        fromUserId: incomingCall.fromUserId,
        toUserId: userId,
      });
    },
    rejectCall: () => {
      if (!incomingCall) return;
      socketRef.current.emit("reject-call", {
        fromUserId: incomingCall.fromUserId,
        toUserId: userId,
      });
      setIncomingCall(null);
    },
    getLocalStream: () => localStreamRef.current,
    getRemoteStream: () => remoteStreamRef.current,
  };
};
