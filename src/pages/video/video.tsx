import React, { useEffect, useRef, useState } from "react";
import { useWebRTC } from "@hooks/useWebRtc";

type Props = {
  userId: string;
  targetUserId: string;
  onClose?: () => void;
};

const Video: React.FC<Props> = ({ userId, targetUserId, onClose }) => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  // 🔹 We’ll use a state trigger to force UI re-render when remote stream changes
  const [streamsVersion, setStreamsVersion] = useState(0);

  const {
    isInCall,
    incomingCall,
    startCall,
    acceptCall,
    rejectCall,
    endCall,
    getLocalStream,
    getRemoteStream,
  } = useWebRTC({
    userId,
    targetUserId,
    onCallEnded: onClose,
  });

  // 🔹 Re-bind local & remote video streams whenever changed
  useEffect(() => {
    const local = getLocalStream();
    if (local && localVideoRef.current) {
      localVideoRef.current.srcObject = local;
      localVideoRef.current.muted = true;
      localVideoRef.current
        .play()
        .catch(() => console.warn("Local video autoplay blocked"));
    }

    const remote = getRemoteStream();
    if (remote && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remote;
      remoteVideoRef.current
        .play()
        .catch(() => console.warn("Remote video autoplay blocked"));
    }
  }, [streamsVersion]); // 👈 runs every time we increment version below

  // 🔹 Listen for remote stream update from the WebRTC hook
  useEffect(() => {
    const handleTrack = () => setStreamsVersion((v) => v + 1);
    window.addEventListener("remoteStreamReady", handleTrack);
    return () => window.removeEventListener("remoteStreamReady", handleTrack);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <div className="w-[980px] max-w-[95vw] bg-[#1a0f2b] border border-white/10 rounded-2xl p-4 shadow-2xl text-white">
        {/* Incoming call popup */}
        {incomingCall && !isInCall ? (
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <h2 className="text-2xl font-semibold text-pink-400">
              📞 Incoming Call
            </h2>
            <p className="text-lg text-white/80">
              {incomingCall.fromName || "Someone"} is calling you...
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={acceptCall}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 font-semibold hover:opacity-90"
              >
                Accept
              </button>
              <button
                onClick={rejectCall}
                className="px-6 py-2 rounded-full bg-red-600 font-semibold hover:opacity-90"
              >
                Reject
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Main video layout */}
            <div className="relative flex justify-center items-center">
              {/* Remote video full-width */}
              <video
                ref={remoteVideoRef}
                className="w-full max-h-[70vh] bg-black rounded-xl aspect-video object-cover"
                playsInline
                autoPlay
              />

              {/* Local video overlayed small preview */}
              <video
                ref={localVideoRef}
                className="absolute bottom-4 right-4 w-48 rounded-lg border-2 border-pink-400 shadow-lg bg-black aspect-video object-cover"
                playsInline
                autoPlay
                muted
              />
            </div>

            <div className="flex justify-center gap-4 mt-6">
              {!isInCall ? (
                <button
                  onClick={startCall}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:opacity-90"
                >
                  Start Call
                </button>
              ) : (
                <button
                  onClick={endCall}
                  className="px-5 py-2 rounded-full bg-red-600 text-white font-semibold hover:opacity-90"
                >
                  End Call
                </button>
              )}

              <button
                onClick={() => {
                  endCall();
                  onClose?.();
                }}
                className="px-5 py-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Video;
