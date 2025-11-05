import { useEffect, useState } from "react";
import { dispatch } from "@redux/store";
import { getAllConnections } from "@redux/slices/connection";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constants/path";
import { addChatUser } from "@redux/slices/chat";

const Connections = () => {
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
    dispatch(addChatUser({ data: connection }));
    navigate(PATH.CHAT);
  };

  if (!connections || connections.length === 0)
    return (
      <h1 className="flex justify-center mt-72 sm:mt-52">
        {" "}
        No Connections Found
      </h1>
    );

  return (
    <div className="text-center mb-10 mt-20">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections?.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-[50%] mx-auto justify-between px-10"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={Array.isArray(photoUrl) ? photoUrl[0] : photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <div className="flex">
                <p>{age}</p>
                {gender && <p> ,</p>}
                <p className="pl-2"> {gender}</p>
              </div>
              <p>{about}</p>
            </div>
            <button
              onClick={() => handleChat(connection)}
              className="btn btn-secondary px-7 mt-4"
            >
              Chat
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
