import { useEffect, useState } from "react";
import { getAllRequests } from "@redux/slices/request";
import { dispatch } from "@redux/store";
import RequestCard from "@sections/request/RequestCard";
import SkeletonConnections from "@shimmer_ui/SkeletonConnections";
import NoRequestFound from "@sections/request/NoRequestFound";

const Requests = () => {
  const [requests, setRequests] = useState<requestsDetailsTypes[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      const res = await dispatch(getAllRequests());
      setRequests(res);
      setLoading(false);
    }

    fetchRequests();
  }, []);

  if (loading) {
    return <SkeletonConnections arrayLength={5} />;
  }

  if (!requests || requests?.length === 0)
    return (
      <NoRequestFound
        title="Request"
        text={"Once someone sends you a request, you’ll see it here!"}
      />
    );

  return (
    <div className="text-center mb-10 mt-20 ">
      <h1 className="text-3xl font-extrabold mb-6 text-white text-transparent bg-clip-text drop-shadow-lg">
        Matche Requests
      </h1>

      {requests.map((request: requestsDetailsTypes) => (
        <RequestCard
          key={request._id}
          requestDetails={{
            ...request?.fromUserId,
            photoUrl: Array.isArray(request?.fromUserId?.photoUrl)
              ? request.fromUserId.photoUrl.map((url: string) => ({
                  url,
                  public_id: "",
                }))
              : [],
          }}
          requestId={request?._id}
          setRequests={setRequests}
        />
      ))}
    </div>
  );
};
export default Requests;
