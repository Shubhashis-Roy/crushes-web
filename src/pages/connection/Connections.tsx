import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dispatch } from "@redux/store";
import { getAllConnections } from "@redux/slices/connection";

const Connections = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    async function fetchConnections() {
      const res = await dispatch(getAllConnections());
      setConnections(res);
    }

    fetchConnections();
  }, []);

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
            <Link to={"/chat"}>
              <button className="btn btn-secondary px-7 mt-4">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
