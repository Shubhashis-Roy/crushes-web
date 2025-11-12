import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { calculateAge } from "@utils/date";
import {
  FaHeart,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { dispatch } from "@redux/store";
import { sendRequest } from "@redux/slices/connection";

interface UserCardProps {
  user: feedDetailsTypes;
  onShowDetails: () => void;
  onHideDetails: () => void;
  isDetailsVisible: boolean;
  setUsers: React.Dispatch<React.SetStateAction<feedDetailsTypes[]>>;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onShowDetails,
  onHideDetails,
  isDetailsVisible,
  setUsers,
}) => {
  const { _id, firstName, dateOfBirth, city, photoUrl } = user;

  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    setAge(calculateAge(user?.dateOfBirth || ""));
  }, [dateOfBirth]);

  const photos = Array.isArray(photoUrl)
    ? photoUrl
        .map((p: string | { url: string }) =>
          typeof p === "string" ? p : p?.url
        )
        .filter(Boolean)
    : photoUrl
    ? [photoUrl]
    : [];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showLove, setShowLove] = useState(false);
  const [showNo, setShowNo] = useState(false);
  const [{ x, rot }, api] = useSpring(() => ({ x: 0, rot: 0 }));

  const handleSendRequest = async (status: string) => {
    // console.log(status, "status handleSendRequest hlo");
    if (status === "ignored") {
      const res = await dispatch(
        sendRequest({
          id: _id,
          status: "ignored",
        })
      );
      if (res?.status !== 200) return;
      setUsers((prev: feedDetailsTypes[]) => prev.slice(1));
    }
    if (status === "interested") {
      const res = await dispatch(
        sendRequest({
          id: _id,
          status: "interested",
        })
      );
      if (res?.status !== 200) return;
      setUsers((prev: feedDetailsTypes[]) => prev.slice(1));
    }
  };

  // Gesture for swipe
  const bind = useGesture({
    onDrag: ({ down, movement: [mx] }) => {
      api.start({ x: down ? mx : 0, rot: down ? mx / 20 : 0, immediate: down });
    },
    onDragEnd: ({ movement: [mx], direction: [xDir], velocity }) => {
      const swipeThreshold = 120;
      const velocityThreshold = 0.4;

      // if (Math.abs(mx) < swipeThreshold || velocity < velocityThreshold) {
      if (
        Math.abs(mx) < swipeThreshold ||
        Number(velocity) < velocityThreshold
      ) {
        api.start({ x: 0, rot: 0 });
        return;
      }

      if (xDir > 0) {
        setShowLove(true);
        setTimeout(() => setShowLove(false), 1000);
        handleSendRequest("interested");
        // console.log("interested hlo");
      } else {
        setShowNo(true);
        setTimeout(() => setShowNo(false), 1000);
        handleSendRequest("ignored");
        // console.log("ignored hlo");
      }

      api.start({ x: xDir > 0 ? 500 : -500, rot: xDir > 0 ? 15 : -15 });
    },
  });

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex((i) => (i + 1) % photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* ============== Swipe feedback ============== */}
      {showLove && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="text-pink-400 text-4xl font-bold drop-shadow-glow">
            💖 Crush!
          </div>
        </div>
      )}
      {showNo && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="text-red-400 text-4xl font-bold drop-shadow-glow">
            💔 Not Interested
          </div>
        </div>
      )}

      {/* ============== Swipe Card ============== */}
      <animated.div
        {...bind()}
        style={{
          x,
          rotateZ: rot,
          touchAction: "none",
        }}
        className="relative w-[340px] h-[530px] rounded-2xl overflow-hidden shadow-2xl border border-white/10
                   bg-black/40 backdrop-blur-md cursor-grab"
      >
        {/* ============== Photo Progress Bar ============== */}
        {photos.length > 1 && (
          <div className="absolute top-3 left-3 right-3 z-20 flex gap-2 justify-center">
            {photos.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full overflow-hidden ${
                  idx === currentPhotoIndex ? "bg-pink-600" : "bg-white/30"
                }`}
              >
                <div
                  className="h-full bg-pink-400 transition-all duration-300"
                  style={{
                    width: idx === currentPhotoIndex ? "100%" : "0%",
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* ============== Photo Arrows ============== */}
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

        {/* ============== Main Image ============== */}
        {photos.length > 0 ? (
          <img
            src={
              photos[currentPhotoIndex] ||
              "https://res.cloudinary.com/demo/image/upload/v1710000000/default-avatar.jpg"
            }
            alt={firstName}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-800 to-pink-700 text-white text-lg font-semibold">
            No photo available 😔
          </div>
        )}

        {/* ============== Info Overlay ============== */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {firstName}
                {Number(age) > 0 && (
                  <span className="text-white/90 text-[24px] pl-2">
                    • {age}
                  </span>
                )}
              </h2>
              {city && <p className="text-sm text-white/80">{city}</p>}
            </div>
          </div>

          {/* ============== Action Buttons ============== */}
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

          {/* ============== Details Button ============== */}
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

export default UserCard;
