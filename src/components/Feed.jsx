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
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
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
                transform: isSelected ? "translateX(-100px)" : "translateX(0)",
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
              className="absolute right-[7%] top-[30%] -translate-y-1/2 w-[420px] z-[60]"
            >
              <div
                className="relative bg-gradient-to-br from-[#2D1B43]/90 via-[#431F63]/80 to-[#6B2E91]/70 
        backdrop-blur-2xl rounded-2xl p-7 shadow-[0_8px_40px_rgba(0,0,0,0.5)] border border-white/10 
        hover:shadow-[0_0_25px_rgba(248,109,132,0.3)] transition-all duration-300 overflow-y-auto max-h-[80vh]"
              >
                {/* Decorative glow overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-400/10 to-purple-500/10 pointer-events-none" />

                <div className="relative z-10 space-y-3">
                  {/* Basic Info */}
                  <h2 className="text-2xl font-bold capitalize text-white drop-shadow-md">
                    {selectedUser.name || selectedUser.firstName}
                  </h2>
                  <p className="text-sm text-white/80">
                    {selectedUser.age && `${selectedUser.age}, `}
                    {selectedUser.gender}
                  </p>
                  <p className="text-white/80">{selectedUser.city}</p>
                  <p className="text-white/70 text-sm">{selectedUser.email}</p>

                  {/* Profession / Education */}
                  {(selectedUser.profession ||
                    selectedUser.education ||
                    selectedUser.company) && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-pink-300 mb-1">
                        Career & Education
                      </h3>
                      {selectedUser.profession && (
                        <p className="text-sm text-white/85">
                          Profession: {selectedUser.profession}
                        </p>
                      )}
                      {selectedUser.company && (
                        <p className="text-sm text-white/85">
                          Company: {selectedUser.company}
                        </p>
                      )}
                      {selectedUser.education && (
                        <p className="text-sm text-white/85">
                          Education: {selectedUser.education}
                        </p>
                      )}
                    </div>
                  )}

                  {/* About */}
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-pink-300 mb-1">
                      About
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {selectedUser.bio ||
                        selectedUser.about ||
                        "No bio yet — maybe this mystery makes them more interesting."}
                    </p>
                  </div>

                  {/* Interests / Personality */}
                  {selectedUser.hobbies?.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-pink-300 mb-1">
                        Hobbies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.hobbies.map((hobby, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-sm rounded-full bg-white/10 text-white border border-white/20"
                          >
                            {hobby}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedUser.lifestyle?.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-pink-300 mb-1">
                        Lifestyle
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.lifestyle.map((life, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-sm rounded-full bg-white/10 text-white border border-white/20"
                          >
                            {life}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedUser.personality?.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-pink-300 mb-1">
                        Personality
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.personality.map((trait, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-sm rounded-full bg-white/10 text-white border border-white/20"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedUser.lookingFor?.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-pink-300 mb-1">
                        Looking For
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.lookingFor.map((item, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-sm rounded-full bg-white/10 text-white border border-white/20"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preferences */}
                  <div className="mt-4 text-sm text-white/70 space-y-1">
                    <p>
                      <strong>Interested In:</strong>{" "}
                      {selectedUser.interestedIn?.join(", ") || "Not specified"}
                    </p>
                    <p>
                      <strong>Age Range:</strong>{" "}
                      {selectedUser.ageRange?.join(" - ")}
                    </p>
                    <p>
                      <strong>Distance Range:</strong>{" "}
                      {selectedUser.distanceRange || 0} km
                    </p>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="px-6 py-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 
              rounded-full text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 
              transition-all duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Feed;
