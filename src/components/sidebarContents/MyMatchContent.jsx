import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../redux/conectionSlice";
import { Link } from "react-router-dom";

const MyMatchContent = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <div className="text-center mt-16">
        <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          💞 My Matches
        </h2>
        <p className="text-white/60 text-lg">
          No connections found yet — your stars are still aligning ✨
        </p>
      </div>
    );

  return (
    <div className="w-full flex flex-col items-center text-center text-white mt-10 px-4">
      {/* 🌸 Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
          💞 My Matches
        </h2>
        <p className="text-white/80 mt-2">
          These are the amazing souls who matched with you — go say hi 🌠
        </p>
      </div>

      {/* 💖 Match Cards */}
      <div className="grid gap-8 w-full max-w-5xl">
        {connections.map((connection) => {
          const { _id, firstName, lastName, age, photoUrl, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="group relative w-full bg-white/10 border border-white/20 rounded-2xl backdrop-blur-2xl shadow-lg overflow-hidden p-5 flex flex-col sm:flex-row items-center gap-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-pink-500/30"
            >
              {/* 🖼️ Profile Photo */}
              <div className="relative">
                <img
                  alt={`${firstName}'s photo`}
                  src={Array.isArray(photoUrl) ? photoUrl[0] : photoUrl}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              {/* 💬 Info */}
              <div className="flex-1 text-left space-y-1">
                <h2 className="text-2xl font-bold text-white">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-white/70">
                  {age && `${age} yrs`}{" "}
                  {gender && <span className="text-white/60">• {gender}</span>}
                </p>
                {about && (
                  <p className="text-sm text-white/60 italic mt-1">
                    “{about}”
                  </p>
                )}
              </div>

              {/* 💌 Chat Button */}
              <Link to="/chat">
                <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-pink-400/40 hover:scale-105 transition-all duration-300">
                  💬 Chat
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyMatchContent;
