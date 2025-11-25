import { THEME } from "@constants/colors";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserCard from "@sections/feed/UserCard";
import { dispatch } from "@redux/store";
import { getFeed } from "@redux/slices/feed";
import UserDetailsCard from "@sections/feed/UserDetailsCard";
import FeedCardSkeleton from "@shimmer_ui/FeedCardSkeleton";
import { NoUserFound } from "@sections/feed/NoUserFound";

const Feed = () => {
  const [users, setUsers] = useState<feedDetailsTypes[]>([]);
  const [selectedUser, setSelectedUser] = useState<feedDetailsTypes | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (users?.length >= 3) return;

    async function getFeedData() {
      setLoading(true);
      const res = await dispatch(getFeed());
      setUsers(res);
      setLoading(false);
    }

    getFeedData();
  }, [users]);

  // const handleSwipe = (direction: string, swipedUser: feedDetailsTypes) => {
  //   setUsers((prev) => prev.slice(1));
  // };

  if (loading && users?.length === 0) {
    return (
      <div className="relative w-full h-full flex items-center justify-center mt-[7%]">
        <FeedCardSkeleton />;
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white"
      style={{ background: THEME.colors.backgroundGradient }}
    >
      {/* ============= Animated Gradient Background  =================*/}
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

      {/* ========== Card Stack ========== */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence>
          {users.map((user: feedDetailsTypes, index) => {
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
                  // onDragEnd={(e, info) => {
                  //   if (info.offset.x > 150) handleSwipe("right", user);
                  //   else if (info.offset.x < -150) handleSwipe("left", user);
                  // }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-grab active:cursor-grabbing mt-10"
                >
                  {users?.length > 0 ? (
                    <UserCard
                      user={user}
                      onShowDetails={() => setSelectedUser(user)}
                      onHideDetails={() => setSelectedUser(null)}
                      setUsers={setUsers}
                      isDetailsVisible={selectedUser?._id === user._id}
                    />
                  ) : (
                    users?.length === 0 && (
                      <NoUserFound text={"No more users to show 💖"} />
                    )
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* ============ Details Side Panel ============ */}
        <UserDetailsCard
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      </div>
    </div>
  );
};

export default Feed;
