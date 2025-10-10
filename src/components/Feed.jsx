import axios from "axios";
import { BASE_URL, THEME } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
    // eslint-disable-next-line
  }, []);

  if (!feed) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
      {/* 🌌 Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            `linear-gradient(135deg, ${THEME.colors.deep}, ${THEME.colors.primary}, ${THEME.colors.accent})`,
            `linear-gradient(135deg, ${THEME.colors.primary}, ${THEME.colors.accent}, ${THEME.colors.softAccent})`,
            `linear-gradient(135deg, ${THEME.colors.deep}, ${THEME.colors.primary}, ${THEME.colors.accent})`,
          ],
        }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Dim Overlay when showing details */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Cards Stack */}
      <div className="relative w-full h-[660px] flex items-center justify-center z-20">
        {feed.slice(0, 3).map((user, index) => {
          const isSelected = selectedUser && selectedUser._id === user._id;
          const isDimmed = selectedUser && !isSelected;

          return (
            <div
              key={user._id}
              className={`absolute w-96 h-[660px] transition-all duration-500 pt-14 ${
                isSelected ? "z-40" : "z-20"
              }`}
              style={{
                transform: isSelected
                  ? "translateX(-220px)"
                  : "translateX(0)",
                opacity: isDimmed ? 0.4 : 1,
                filter: isDimmed ? "blur(3px)" : "none",
                pointerEvents: isDimmed ? "none" : "auto",
              }}
            >
              <UserCard
                user={user}
                onShowDetails={() => setSelectedUser(user)}
                onHideDetails={() => setSelectedUser(null)}
                isDetailsVisible={isSelected}
              />
            </div>
          );
        })}

        {/* 🪄 Details Panel */}
        <AnimatePresence>
          {selectedUser && (
            <motion.div
              key="details"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[380px] z-[60] 
                bg-black/60 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl border border-white/10"
            >
              <h2 className="text-2xl font-bold mb-1 capitalize">
                {selectedUser.firstName}
              </h2>
              <p className="text-sm text-white/70 mb-1">
                {selectedUser.age && `${selectedUser.age}, `}
                {selectedUser.gender}
              </p>
              <p className="text-white/90 mb-3">{selectedUser.city}</p>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                {selectedUser.about ||
                  "No bio yet — maybe this mystery makes them more interesting."}
              </p>

              <button
                onClick={() => setSelectedUser(null)}
                className="mt-2 px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 
                rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Feed;
