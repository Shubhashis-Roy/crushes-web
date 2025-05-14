import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

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
  }, []);

  if (!feed) return null;

  if (feed.length <= 0)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-white via-pink-100 to-pink-200">
        <h1 className="text-black text-2xl font-semibold drop-shadow-lg">
          💔 No new users found!
        </h1>
      </div>
    );

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-white via-pink-50 to-pink-100">
      <div className="backdrop-blur-lg bg-white/60 p-6 rounded-2xl shadow-xl border border-pink-200 w-[90%] max-w-md transition-all duration-500">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;
