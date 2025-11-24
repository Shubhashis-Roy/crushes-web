const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col items-center w-full animate-pulse">
      {/* Title Skeleton */}
      <div className="h-8 w-56 bg-white/10 rounded-lg mb-3" />
      <div className="h-4 w-40 bg-white/10 rounded-lg mb-10" />

      {/* Buttons Row */}
      <div className="flex gap-4 mb-10">
        <div className="h-10 w-32 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30" />
        <div className="h-10 w-32 rounded-full bg-white/10" />
        <div className="h-10 w-32 rounded-full bg-white/10" />
        <div className="h-10 w-28 rounded-full bg-white/10" />
      </div>

      {/* Avatar Skeleton */}
      <div className="w-40 h-40 rounded-full bg-white/10 border-4 border-white/20 mb-6" />

      <div className="h-4 w-48 bg-white/10 rounded-lg mb-10" />

      {/* Card Container */}
      <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-2xl p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-12 w-full bg-white/10 rounded-lg" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-12 w-full bg-white/10 rounded-lg" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-12 w-full bg-white/10 rounded-lg" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-12 w-full bg-white/10 rounded-lg" />
          </div>

          {/* Bio Row */}
          <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-20 w-full bg-white/10 rounded-lg" />
          </div>
        </div>

        {/* Save Button */}
        <div className="h-12 w-full bg-white/10 rounded-lg mt-10" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
