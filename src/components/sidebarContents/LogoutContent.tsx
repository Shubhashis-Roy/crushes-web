import PropTypes from "prop-types";

const LogoutContent = ({ onConfirm, onCancel }) => {
  const quotes = [
    "Taking a break? We'll be right here.",
    "Come back soon – your matches are waiting!",
    "Every goodbye brings a new hello.",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
        <h2 className="text-xl font-semibold text-pink-600 mb-4">
          Are you sure you want to log out?
        </h2>
        <p className="text-gray-600 italic mb-6">{randomQuote}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};

LogoutContent.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default LogoutContent;
