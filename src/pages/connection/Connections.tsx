import { useEffect, useState } from "react";
import { dispatch } from "@redux/store";
import { getAllConnections } from "@redux/slices/connection";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constants/path";
import ConnectionCard from "@sections/connections/connectionCard";
import SkeletonConnections from "@shimmer_ui/SkeletonConnections";
import NoRequestFound from "@sections/request/NoRequestFound";
import { addChattingUser } from "@redux/slices/chat";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchConnections() {
      setLoading(true);
      const res = await dispatch(getAllConnections());

      setConnections(res);
      setLoading(false);
    }

    fetchConnections();
  }, []);

  const handleChat = (connection: chatUserDetailsTypes) => {
    dispatch(addChattingUser(connection));
    navigate(PATH.CHAT);
  };

  if (loading) {
    return <SkeletonConnections arrayLength={5} />;
  }

  if (!connections || connections.length === 0)
    return (
      <NoRequestFound
        title="connection"
        text={
          "No connections found. Start connecting and they’ll show up here!"
        }
      />
    );

  return (
    <div className="text-center mb-10 mt-20">
      <h1 className="text-3xl font-extrabold mb-6 text-white text-transparent bg-clip-text drop-shadow-lg">
        Matches
      </h1>

      {connections?.map((connection: chatUserDetailsTypes) => (
        <ConnectionCard
          key={connection._id}
          connection={connection}
          onChat={handleChat}
        />
      ))}
    </div>
  );
};
export default Connections;
