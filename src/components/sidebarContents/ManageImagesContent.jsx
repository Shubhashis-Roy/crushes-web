import { FaEdit, FaPlus } from "react-icons/fa";

const ManageImagesContent = ({ user }) => {
  // Normalize to array of up to 3 items
  const images = Array.isArray(user.photoUrl)
    ? user.photoUrl.slice(0, 3)
    : user.photoUrl
    ? [user.photoUrl]
    : [];

  const imageSlots = Array.from({ length: 3 }).map((_, idx) => images[idx] || null);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Images</h2>
      <p className="mb-4">Add up to 3 images to showcase yourself. Drag and drop to reorder.</p>

      <div className="grid grid-cols-3 gap-4">
        {imageSlots.map((img, idx) => (
          <div
            key={idx}
            className="relative w-full aspect-square rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 overflow-hidden"
          >
            {img ? (
              <>
                <img
                  src={img}
                  alt={`Image ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
                <button
                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow text-gray-700 hover:text-blue-500"
                  title="Edit image"
                >
                  <FaEdit />
                </button>
              </>
            ) : (
              <button
                className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-500"
                title="Add image"
              >
                <FaPlus className="text-2xl" />
                <span className="text-xs mt-1">Add</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageImagesContent;
