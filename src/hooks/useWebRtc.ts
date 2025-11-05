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

  const [isInCall, setIsInCall] = useState(false);
  const [incomingCall, setIncomingCall] = useState<{
    fromUserId: string;
    fromName: string;
  } | null>(null);

  // 🧩 queue for ICE candidates that arrive before remoteDescription
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);

  // STUN only (no TURN yet)
  const createPeer = useCallback(() => {
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
      console.log("🎥 ontrack fired with streams:", e.streams);
      if (!remoteStreamRef.current) {
        remoteStreamRef.current = new MediaStream();
      }

      e.streams[0].getTracks().forEach((track) => {
        if (!remoteStreamRef.current!.getTracks().includes(track)) {
          remoteStreamRef.current!.addTrack(track);
        }
      });

      // ✅ trigger manual event for UI to rebind video
      window.dispatchEvent(new Event("remoteStreamReady"));
    };

    return pc;
  }, [userId, targetUserId]);

  const ensureLocalStream = useCallback(async () => {
    if (!localStreamRef.current) {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
    }
    return localStreamRef.current;
  }, []);

  // 🔹 Caller starts a call
  const startCall = useCallback(async () => {
    if (!userId || !targetUserId) return;

    const socket = socketRef.current;

    // tell backend that you're starting a call
    socket.emit("start-call", {
      fromUserId: userId,
      toUserId: targetUserId,
      fromName: userId, // can be replaced with user's name
    });

    // initialize local peer
    const pc = createPeer();
    pcRef.current = pc;

    const local = await ensureLocalStream();
    local.getTracks().forEach((t) => pc.addTrack(t, local));

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("rtc-offer", {
      userId,
      targetUserId,
      sdp: offer,
    });

    setIsInCall(true);
  }, [userId, targetUserId, createPeer, ensureLocalStream]);

  // 🔹 Callee handles offer → create answer
  const handleOffer = useCallback(
    async (sdp: RTCSessionDescriptionInit) => {
      const pc = createPeer();
      pcRef.current = pc;

      const local = await ensureLocalStream();
      local.getTracks().forEach((t) => pc.addTrack(t, local));

      await pc.setRemoteDescription(new RTCSessionDescription(sdp));

      // ✅ drain queued ICE candidates
      while (pendingCandidatesRef.current.length > 0) {
        const candidate = pendingCandidatesRef.current.shift();
        try {
          await pc.addIceCandidate(candidate!);
        } catch (e) {
          console.warn("Failed to add queued ICE:", e);
        }
      }

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

  // 🔹 Caller handles answer
  const handleAnswer = useCallback(async (sdp: RTCSessionDescriptionInit) => {
    if (!pcRef.current) return;
    await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));

    // ✅ drain queued ICE candidates
    while (pendingCandidatesRef.current.length > 0) {
      const candidate = pendingCandidatesRef.current.shift();
      try {
        await pcRef.current.addIceCandidate(candidate!);
      } catch (e) {
        console.warn("Failed to add queued ICE:", e);
      }
    }
  }, []);

  // 🔹 Handle ICE from remote
  const handleRemoteIce = useCallback(
    async (candidate: RTCIceCandidateInit) => {
      if (!candidate) return;

      const pc = pcRef.current;
      if (!pc) {
        console.warn("⚠️ No PeerConnection yet, queueing ICE");
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
        // 🕓 queue until remoteDescription is ready
        pendingCandidatesRef.current.push(candidate);
        console.log("🕓 Queued ICE candidate (waiting for remoteDescription)");
      }
    },
    []
  );

  const endCall = useCallback(() => {
    socketRef.current.emit("end-call", { userId, targetUserId });

    if (pcRef.current) {
      pcRef.current.getSenders().forEach((s) => {
        try {
          s.track?.stop();
        } catch {}
      });
      pcRef.current.close();
      pcRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }

    setIsInCall(false);
    onCallEnded?.();
  }, [userId, targetUserId, onCallEnded]);

  // 🔹 Accept incoming call
  const acceptCall = useCallback(() => {
    if (!incomingCall) return;
    socketRef.current.emit("accept-call", {
      fromUserId: incomingCall.fromUserId,
      toUserId: userId,
    });
  }, [incomingCall, userId]);

  // 🔹 Reject incoming call
  const rejectCall = useCallback(() => {
    if (!incomingCall) return;
    socketRef.current.emit("reject-call", {
      fromUserId: incomingCall.fromUserId,
      toUserId: userId,
    });
    setIncomingCall(null);
  }, [incomingCall, userId]);

  // 🔹 Wire up socket listeners
  useEffect(() => {
    const socket = socketRef.current;

    const onOffer = async ({
      sdp,
      from,
    }: {
      sdp: RTCSessionDescriptionInit;
      from: string;
    }) => {
      if (from && from !== userId) {
        await socket.emit("join-call", { userId, targetUserId });
        await handleOffer(sdp);
      }
    };

    const onAnswer = async ({ sdp }: { sdp: RTCSessionDescriptionInit }) => {
      await handleAnswer(sdp);
    };

    const onIce = async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
      await handleRemoteIce(candidate);
    };

    const onEnded = () => endCall();

    // 🔹 Listen for incoming call
    const onIncomingCall = ({
      fromUserId,
      fromName,
    }: {
      fromUserId: string;
      fromName: string;
    }) => {
      console.log("📞 Incoming call from:", fromName);
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
    acceptCall,
    rejectCall,
    endCall,
    getLocalStream: () => localStreamRef.current,
    getRemoteStream: () => remoteStreamRef.current,
  };
};
