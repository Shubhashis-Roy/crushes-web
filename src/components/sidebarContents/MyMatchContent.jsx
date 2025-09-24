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
      <div className="text-center my-10">
        <h2 className="text-3xl font-semibold text-pink-500 mb-4">
          My Matches
        </h2>
        <p className="text-gray-300">No Connections Found</p>
      </div>
    );

  return (
    <div className="text-center my-10">
      <h2 className="text-3xl font-bold text-pink-500 mb-2">💞 My Matches</h2>
      <p className="text-gray-500 font-bold mb-8">
        These are the people who’ve matched with you. Start chatting or plan a
        date!
      </p>

      <div className="grid gap-6 px-4 max-w-5xl mx-auto">
        {connections.map((connection) => {
          const { _id, firstName, lastName, age, photoUrl, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="w-full bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 flex items-center gap-6 hover:scale-[1.02] transition-transform"
            >
              <img
                alt="photo"
                className="w-24 h-24 rounded-full object-cover border-4 border-pink-500 shadow-md"
                src={Array.isArray(photoUrl) ? photoUrl[0] : photoUrl}
              />
              <div className="flex-1 text-left">
                <h2 className="text-2xl font-bold text-black">
                  {firstName + " " + lastName}
                </h2>
                <p className="text-sm text-gray-600">
                  {age}{" "}
                  {gender && <span className="text-gray-500">• {gender}</span>}
                </p>
                <p className="text-sm text-gray-400 mt-1">{about}</p>
              </div>
              <Link to={"/chat"}>
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full shadow">
                  Chat
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
