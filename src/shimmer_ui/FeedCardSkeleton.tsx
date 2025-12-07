const FeedCardSkeleton = () => {
  return (
    <div className="relative w-[340px] h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-md animate-pulse">
      {/* Top shimmer bar */}
      <div className="absolute top-3 left-3 right-3 h-1 bg-gray-600/20 rounded-full overflow-hidden shimmer"></div>

      {/* Image shimmer */}
      <div className="absolute inset-0 bg-gray-700/30 shimmer" />

      {/* Left Arrow */}
      <div className="absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-600/40 shimmer"></div>

      {/* Right Arrow */}
      <div className="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-600/40 shimmer"></div>

      {/* Bottom info section */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
        {/* Name + Age */}
        <div className="h-5 w-40 bg-gray-500/40 rounded-md shimmer mb-2"></div>

        {/* City */}
        <div className="h-4 w-28 bg-gray-500/30 rounded-md shimmer"></div>

        {/* Action buttons */}
        <div className="mt-4 flex justify-center gap-6">
          <div className="w-14 h-14 rounded-full bg-gray-500/30 shimmer"></div>
          <div className="w-14 h-14 rounded-full bg-gray-500/30 shimmer"></div>
        </div>

        {/* Details button */}
        <div className="mt-4 mx-auto h-10 w-32 bg-gray-500/40 rounded-full shimmer"></div>
      </div>

      {/* Shimmer animation */}
      <style>{`
        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.06) 0%,
            rgba(255,255,255,0.2) 50%,
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

export default FeedCardSkeleton;
