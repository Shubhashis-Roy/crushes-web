import React from "react";

interface ChatSkeletonListProps {
  count?: number;
}

const ChatSkeletonItem = () => {
  return (
    <div className="w-full flex items-center gap-4 px-4 py-3 border-b border-white/5">
      {/* Avatar Skeleton */}
      <div className="w-12 h-12 rounded-full shimmer"></div>

      {/* Text Section */}
      <div className="flex-1">
        <div className="h-4 w-36 shimmer rounded-md mb-2"></div>
        <div className="h-3 w-48 shimmer rounded-md"></div>
      </div>

      {/* Time Skeleton */}
      <div className="w-5 h-3 shimmer rounded-md"></div>
    </div>
  );
};

const ChatSideBarSkeleton: React.FC<ChatSkeletonListProps> = ({
  count = 6,
}) => {
  const skeletonArray = Array.from({ length: count });

  return (
    <div className="w-full">
      {skeletonArray.map((_, index) => (
        <ChatSkeletonItem key={index} />
      ))}

      {/* SHIMMER ANIMATION */}
      <style>{`
        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.05) 0%,
            rgba(255,255,255,0.15) 50%,
            rgba(255,255,255,0.05) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.4s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default ChatSideBarSkeleton;
