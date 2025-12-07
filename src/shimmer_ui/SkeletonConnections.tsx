const SkeletonConnections = ({ arrayLength = 5 }) => {
  const skeletonArray = [...Array(arrayLength)];

  const RenderItem = () => (
    <div className="w-full flex justify-center mt-2">
      <div className="w-[80%] max-w-3xl bg-[#140825]/80 rounded-xl p-5 shadow-xl border border-white/10 animate-pulse">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-4">
            {/* Avatar skeleton */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-700/20 to-gray-600/30 animate-shimmer"></div>

            {/* Text skeleton */}
            <div>
              <div className="h-4 w-32 bg-gray-600/30 rounded-md mb-3 animate-shimmer"></div>
              <div className="h-3 w-24 bg-gray-600/20 rounded-md mb-2 animate-shimmer"></div>
              <div className="h-3 w-40 bg-gray-600/20 rounded-md animate-shimmer"></div>
            </div>
          </div>

          {/* Button skeleton */}
          <div className="w-20 h-10 bg-gradient-to-r from-gray-700/30 to-gray-600/40 rounded-full animate-shimmer"></div>
        </div>
      </div>

      {/* SHIMMER ANIMATION */}
      <style>{`
            .animate-shimmer {
              background: linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.06) 100%);
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

  return (
    <div className="mt-20">
      {skeletonArray.map((_, index) => (
        <RenderItem key={index} />
      ))}
    </div>
  );
};

export default SkeletonConnections;
