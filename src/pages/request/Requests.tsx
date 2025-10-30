import { useEffect, useState } from "react";
import { getAllRequests, reviewConnectionRequest } from "@redux/slices/request";
import { dispatch } from "@redux/store";
import { connectionEnum } from "@enum/connectionEnum";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  const reviewRequest = async (status: string, _id: string) => {
    dispatch(
      reviewConnectionRequest({
        status,
        requestId: _id,
      })
    );
  };

  useEffect(() => {
    async function fetchRequests() {
      const res = await dispatch(getAllRequests());
      setRequests(res);
    }

    fetchRequests();
  }, []);

  if (!requests || requests?.length === 0)
    return (
      <h1 className="flex justify-center mt-72 sm:mt-52"> No Requests Found</h1>
    );

  return (
    <div className="text-center mb-10 mt-20 ">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request: requestsDetailsTypes) => {
        const { _id, firstName, lastName, photoUrl, gender, bio } =
          request.fromUserId;
        const age = 24;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto justify-between"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
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
              <p>{bio}</p>
            </div>
            <div>
              <button
                className="btn btn-neutral mx-2 mt-4"
                onClick={() =>
                  reviewRequest(connectionEnum.REJECTED, request._id)
                }
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2 mt-4"
                onClick={() =>
                  reviewRequest(connectionEnum.ACCEPTED, request._id)
                }
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
