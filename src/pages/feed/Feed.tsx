import { THEME } from "@constants/colors";
// import { BASE_URL } from "@services/axios";
import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../redux/feedSlice";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserCard from "@sections/feed/UserCard";

const Feed = () => {
  // const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([
    {
      about: "This is a default about of user",
      skills: ["default - JS"],
      _id: "68fcdd490d7ad2e83ac546f1",
      firstName: "shub",
      lastName: "Roy",
      city: "Siliguri",
      photoUrl: [],
    },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);

  const getFeed = async () => {
    // try {
    //   const res = await axios.get(`${BASE_URL}/feed`, {
    //     withCredentials: true,
    //   });
    //   // dispatch(addFeed(res?.data?.data));
    //   setUsers(res?.data?.data || []);
    // } catch (err) {
    //   console.error("Feed fetch failed:", err);
    // }
  };

  // useEffect(() => {
  //   if (!feed || feed.length === 0) getFeed();
  //   else setUsers(feed);
  //   // eslint-disable-next-line
  // }, [feed]);

  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-gradient-to-br from-purple-900 to-pink-800">
        <p className="text-lg font-semibold">No more users to show 💖</p>
      </div>
    );
  }

  const handleSwipe = (direction, swipedUser) => {
    // remove the top user (simulate swipe)
    setUsers((prev) => prev.slice(1));
    console.log(`Swiped ${direction} on ${swipedUser.firstName}`);
  };

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

      {/* 🪄 Card Stack */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence>
          {users.map((user, index) => {
            const isTop = index === 0;
            const scale = 1 - index * 0.05;
            const yOffset = index * 15;

            return (
              <motion.div
                key={user._id}
                className="absolute"
                style={{ zIndex: users.length - index }}
                initial={{ scale, y: yOffset, opacity: 1 }}
                animate={{ scale, y: yOffset, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -50 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, info) => {
                    if (info.offset.x > 150) handleSwipe("right", user);
                    else if (info.offset.x < -150) handleSwipe("left", user);
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <UserCard
                    user={user}
                    onShowDetails={() => setSelectedUser(user)}
                    onHideDetails={() => setSelectedUser(null)}
                    isDetailsVisible={selectedUser?._id === user._id}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>

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
