import PropTypes from "prop-types";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../redux/feedSlice";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { useState } from "react";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, age, gender, about, city, photoUrl } = user;

  // Use user.photoUrl array or fallback to single photoUrl in array form
  const photos = Array.isArray(user.photoUrl) && user.photoUrl.length > 0
    ? user.photoUrl
    : [photoUrl];

  // State to track which photo is currently shown
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const [showLove, setShowLove] = useState(false);
  const [showNo, setShowNo] = useState(false);

  const [{ x, rot }, api] = useSpring(() => ({ x: 0, rot: 0 }));

  const handleSendRequest = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const bind = useGesture({
    onDrag: ({ down, movement: [mx] }) => {
      api.start({
        x: down ? mx : 0,
        rot: down ? mx / 20 : 0,
        immediate: down,
      });
    },
    onDragEnd: ({ movement: [mx], direction: [xDir], velocity }) => {
      const swipeThreshold = 100;

      if (Math.abs(mx) < swipeThreshold || velocity < 0.3) {
        api.start({ x: 0, rot: 0 });
        return;
      }

      if (xDir < 0) {
        setShowLove(true);
        setTimeout(() => setShowLove(false), 1500);
        handleSendRequest("interested");
      } else {
        setShowNo(true);
        setTimeout(() => setShowNo(false), 1500);
        handleSendRequest("ignored");
      }

      api.start({ x: xDir < 0 ? -500 : 500, rot: xDir < 0 ? -15 : 15 });
    },
  });

  // Navigate to next photo
  const nextPhoto = () => {
    setCurrentPhotoIndex((i) => (i + 1) % photos.length);
  };

  // Navigate to previous photo
  const prevPhoto = () => {
    setCurrentPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative w-96 h-[660px] flex flex-col items-center justify-center">
      {/* ❤️ Floating hearts */}
      {showLove && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          {[...Array(6)].map((_, i) => (
            <FaHeart
              key={i}
              className="text-pink-500 text-3xl animate-float"
              style={{
                position: "absolute",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.7,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* ❌ NO text */}
      {showNo && (
        <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-red-600 text-6xl font-bold animate-no">NO</div>
        </div>
      )}

      {/* Swipeable Card */}
      <animated.div
        {...bind()}
        style={{ x, rotateZ: rot }}
        className="absolute w-full h-[600px] rounded-2xl overflow-hidden shadow-xl touch-none z-10 bg-base-300"
      >
        {/* Photo status bar */}
        <div className="absolute top-3 left-3 right-3 z-20 flex gap-2 justify-center">
          {photos.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full overflow-hidden ${
                idx === currentPhotoIndex
                  ? "bg-pink-600"
                  : "bg-gray-300"
              }`}
            >
              {/* Fill proportionally (optional) */}
              <div
                className={`h-full bg-pink-400 transition-all duration-300`}
                style={{
                  width: idx === currentPhotoIndex ? "100%" : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Prev / Next buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevPhoto();
          }}
          className="absolute top-1/2 left-2 z-30 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70 transition"
          aria-label="Previous photo"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextPhoto();
          }}
          className="absolute top-1/2 right-2 z-30 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70 transition"
          aria-label="Next photo"
        >
          <FaChevronRight />
        </button>

        <div className="card-body relative h-[600px]">
          <img
            src={photos[currentPhotoIndex]}
            alt={`${firstName}'s photo ${currentPhotoIndex + 1}`}
            className="w-full h-full object-cover z-10 relative rounded-2xl"
          />

          <div className="flex justify-between items-center mt-4 px-2 gap-40">
            <h2 className="card-title text-white text-3xl font-extrabold">
              {firstName}
            </h2>
            {city && <p className="text-[13px] text-white">{city}</p>}
          </div>

          {age !== undefined && age !== null && gender && (
            <p className="text-white px-2 mt-2">{age + ", " + gender}</p>
          )}

          {about && <p className="text-white px-2 mt-2">{about}</p>}
        </div>
      </animated.div>

      {/* Bottom Action Buttons */}
      <div className="absolute bottom-0 flex justify-center gap-8 z-30">
        <button
          onClick={() => {
            setShowLove(true);
            setTimeout(() => setShowLove(false), 1500);
            handleSendRequest("interested");
          }}
          className="w-14 h-14 rounded-full border-4 border-green-400 text-green-500 flex items-center justify-center text-2xl hover:scale-110 transition-transform"
        >
          ❤️
        </button>

        <button
          onClick={() => alert("⭐ Maybe clicked – placeholder")}
          className="w-12 h-12 rounded-full border-4 border-blue-300 text-blue-400 flex items-center justify-center text-xl hover:scale-110 transition-transform"
        >
          ⭐
        </button>

        <button
          onClick={() => {
            setShowNo(true);
            setTimeout(() => setShowNo(false), 1500);
            handleSendRequest("ignored");
          }}
          className="w-14 h-14 rounded-full border-4 border-red-400 text-red-500 flex items-center justify-center text-2xl hover:scale-110 transition-transform"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    photoUrl: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    age: PropTypes.number,
    gender: PropTypes.oneOf(["male", "female", "other"]),
    about: PropTypes.string,
    city: PropTypes.string,
  }),
};

export default UserCard;
