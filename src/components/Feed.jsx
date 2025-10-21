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
      const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
    // eslint-disable-next-line
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-gradient-to-br from-purple-900 to-pink-800">
        <p className="text-lg font-semibold">No more users to show 💖</p>
      </div>
    );
  }

  const currentUser = feed[0]; // ✅ Only show one user at a time

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white"
      style={{ background: THEME.colors.backgroundGradient }}
    >
      {/* 🌌 Animated Gradient Background */}
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

      {/* 💖 Single Centered Card */}
      <div className="relative w-full h-full flex items-center justify-center">
        <UserCard
          user={currentUser}
          onShowDetails={() => setSelectedUser(currentUser)}
          onHideDetails={() => setSelectedUser(null)}
          isDetailsVisible={!!selectedUser}
        />

        {/* 🪄 Details Side Panel */}
        <AnimatePresence>
          {selectedUser && (
            <motion.div
              key="details"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute right-[6%] top-1/2 -translate-y-1/2 w-[380px] z-[60]
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
