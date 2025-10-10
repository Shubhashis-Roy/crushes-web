import PropTypes from "prop-types";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../redux/feedSlice";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { useState } from "react";
import { FaHeart, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const UserCard = ({ user, onShowDetails, onHideDetails, isDetailsVisible }) => {
  const dispatch = useDispatch();
  const { _id, firstName, age, city, photoUrl } = user;

  // handle multiple photos
  const photos =
    Array.isArray(photoUrl) && photoUrl.length > 0 ? photoUrl : [photoUrl];
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const [showLove, setShowLove] = useState(false);
  const [showNo, setShowNo] = useState(false);
  const [{ x, rot }, api] = useSpring(() => ({ x: 0, rot: 0 }));

  const handleSendRequest = async (status) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const bind = useGesture({
    onDrag: ({ down, movement: [mx] }) => {
      api.start({ x: down ? mx : 0, rot: down ? mx / 20 : 0, immediate: down });
    },
    onDragEnd: ({ movement: [mx], direction: [xDir], velocity }) => {
      const swipeThreshold = 120;
      const velocityThreshold = 0.4;

      if (Math.abs(mx) < swipeThreshold || velocity < velocityThreshold) {
        api.start({ x: 0, rot: 0 });
        return;
      }

      if (xDir > 0) {
        setShowLove(true);
        setTimeout(() => setShowLove(false), 1200);
        handleSendRequest("interested");
      } else {
        setShowNo(true);
        setTimeout(() => setShowNo(false), 1200);
        handleSendRequest("ignored");
      }

      api.start({ x: xDir > 0 ? 500 : -500, rot: xDir > 0 ? 15 : -15 });
    },
  });

  const nextPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhotoIndex((i) => (i + 1) % photos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {/* ❤️ or ❌ overlays */}
      {showLove && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="text-pink-400 text-4xl font-bold drop-shadow-glow">💖 Crush!</div>
        </div>
      )}
      {showNo && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="text-red-400 text-4xl font-bold drop-shadow-glow">💔 Not Interested</div>
        </div>
      )}

      {/* Swipe Card */}
      <animated.div
        {...bind()}
        style={{
          x,
          rotateZ: rot,
          touchAction: "none",
        }}
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-md cursor-grab"
      >
        {/* 🔹 Photo Progress Bar */}
        <div className="absolute top-3 left-3 right-3 z-20 flex gap-2 justify-center">
          {photos.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full overflow-hidden ${
                idx === currentPhotoIndex ? "bg-pink-600" : "bg-white/30"
              }`}
            >
              <div
                className={`h-full bg-pink-400 transition-all duration-300`}
                style={{
                  width: idx === currentPhotoIndex ? "100%" : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* 🔹 Prev / Next Arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute top-1/2 left-3 -translate-y-1/2 z-20 bg-black/40 p-2 rounded-full text-white hover:bg-black/70 transition"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute top-1/2 right-3 -translate-y-1/2 z-20 bg-black/40 p-2 rounded-full text-white hover:bg-black/70 transition"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        {/* 🔹 Main Image */}
        <img
          src={photos[currentPhotoIndex]}
          alt={firstName}
          className="w-full h-full object-cover pointer-events-none select-none"
        />

        {/* Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {firstName}
                {age && <span className="text-white/80 text-lg"> • {age}</span>}
              </h2>
              {city && <p className="text-sm text-white text-pretty">{city}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex justify-center gap-6">
            <button
              onClick={() => {
                setShowNo(true);
                setTimeout(() => setShowNo(false), 1000);
                handleSendRequest("ignored");
              }}
              className="w-14 h-14 rounded-full border-4 border-red-400 flex items-center justify-center text-2xl text-red-500 hover:scale-110 transition-transform"
            >
              <FaTimes />
            </button>

            <button
              onClick={() => {
                setShowLove(true);
                setTimeout(() => setShowLove(false), 1000);
                handleSendRequest("interested");
              }}
              className="w-14 h-14 rounded-full border-4 border-green-400 flex items-center justify-center text-2xl text-green-500 hover:scale-110 transition-transform"
            >
              <FaHeart />
            </button>
          </div>

          {/* More Details */}
          <div className="mt-4 flex justify-center">
            {!isDetailsVisible ? (
              <button
                onClick={onShowDetails}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:opacity-90 transition"
              >
                More Details
              </button>
            ) : (
              <button
                onClick={onHideDetails}
                className="px-4 py-2 bg-white/20 text-white rounded-full font-semibold hover:bg-white/30 transition"
              >
                Close Details
              </button>
            )}
          </div>
        </div>
      </animated.div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  onShowDetails: PropTypes.func.isRequired,
  onHideDetails: PropTypes.func.isRequired,
  isDetailsVisible: PropTypes.bool.isRequired,
};

export default UserCard;
