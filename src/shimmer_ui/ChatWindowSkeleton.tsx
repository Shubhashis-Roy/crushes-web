import React from "react";

const ChatWindowSkeleton: React.FC = () => {
  return (
    <div className="w-full h-full p-4 space-y-5 overflow-y-auto">
      {/* Repeat skeleton blocks */}
      {[...Array(7)].map((_, i) => (
        <SkeletonBubble key={i} isRight={i % 2 === 0} />
      ))}

      {/* Shimmer Animation */}
      <style>{`
        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.06) 0%,
            rgba(255,255,255,0.15) 50%,
            rgba(255,255,255,0.06) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default ChatWindowSkeleton;

// ========================
//  SINGLE BUBBLE SKELETON
// ========================

const SkeletonBubble: React.FC<{ isRight: boolean }> = ({ isRight }) => {
  const width = ["40%", "25%", "45%", "20%"][Math.floor(Math.random() * 4)];

  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"} w-full`}>
      <div
        className={`shimmer rounded-2xl p-3`}
        style={{
          width,
          height: "20px",
          borderRadius: isRight ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          backgroundColor: "rgba(255,255,255,0.08)",
        }}
      ></div>
    </div>
  );
};
