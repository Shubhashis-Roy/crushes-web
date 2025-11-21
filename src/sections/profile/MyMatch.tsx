import { PATH } from "@constants/path";
import { addChattingUser } from "@redux/slices/chat";
import { getAllConnections } from "@redux/slices/connection";
import { dispatch } from "@redux/store";
import ConnectionCard from "@sections/connections/connectionCard";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyMatch = () => {
  const [connections, setConnections] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchConnections() {
      const res = await dispatch(getAllConnections());
      setConnections(res);
    }

    fetchConnections();
  }, []);

  const handleChat = (connection: chatUserDetailsTypes) => {
    dispatch(addChattingUser(connection));
    navigate(PATH.CHAT);
  };

  if (!connections) return null;

  if (connections?.length === 0)
    return (
      <div className="text-center mt-16">
        <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-400 bg-clip-text text-transparent">
          💞 My Matches
        </h2>
        <p className="text-white/60 text-lg">
          No connections found yet — your stars are still aligning ✨
        </p>
      </div>
    );

  return (
    <div className="w-full flex flex-col items-center text-center text-white mt-10 px-4">
      {/* ============= Header ============== */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
          💞 My Matches
        </h2>
        <p className="text-white/80 mt-2">
          These are the amazing souls who matched with you — go say hi 🌠
        </p>
      </div>

      {/* ============= Match Cards ============== */}
      {connections?.map((connection: chatUserDetailsTypes) => (
        <ConnectionCard
          key={connection._id}
          connection={connection}
          onChat={handleChat}
          styleObj={{ sm_w: "", md_w: "90%" }}
        />
      ))}
    </div>
  );
};

export default MyMatch;
