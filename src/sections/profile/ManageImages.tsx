import React from "react";
import { FaEdit, FaPlus } from "react-icons/fa";

const ManageImages: React.FC<{ user: profileDetailsTypes }> = ({ user }) => {
  // Normalize to array of up to 3 items
  const images = Array.isArray(user.photoUrl)
    ? user.photoUrl.slice(0, 3)
    : user.photoUrl
    ? [user.photoUrl]
    : [];

  const imageSlots = Array.from({ length: 3 }).map(
    (_, idx) => images[idx] || null
  );

  return (
    <div className="w-full flex flex-col items-center text-center text-white">
      {/* ✨ Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
          Manage Your Images
        </h2>
        <p className="text-white/70 text-sm">
          Add up to{" "}
          <span className="text-pink-300 font-semibold">3 images</span> to
          showcase yourself 🌸
        </p>
      </div>

      {/* 🌈 Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        {imageSlots.map((img, idx) => (
          <div
            key={idx}
            className="relative w-full aspect-square rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl overflow-hidden shadow-lg hover:shadow-pink-500/40 transition-all duration-300 flex items-center justify-center"
          >
            {img ? (
              <>
                <img
                  src={img}
                  alt={`Image ${idx + 1}`}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />

                {/* 🖊️ Edit Button */}
                <button
                  className="absolute top-3 right-3 bg-gradient-to-r from-pink-400 to-purple-500 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                  title="Edit image"
                >
                  <FaEdit className="text-white text-sm" />
                </button>
              </>
            ) : (
              // ➕ Add Image Placeholder
              <button
                className="flex flex-col items-center justify-center text-white/60 hover:text-white transition-all duration-300"
                title="Add image"
              >
                <div className="w-14 h-14 rounded-full border border-dashed border-white/40 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all">
                  <FaPlus className="text-2xl" />
                </div>
                <span className="text-xs mt-2">Add Image</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 💡 Footer Note */}
      <p className="mt-6 text-white/60 text-sm">
        ✨ Drag and drop functionality coming soon!
      </p>
    </div>
  );
};

export default ManageImages;
