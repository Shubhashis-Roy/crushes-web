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
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300/60 to-pink-200/60">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80')] bg-cover bg-center mix-blend-overlay opacity-30 z-0" />
        <h1 className="relative z-10 text-white text-3xl font-semibold drop-shadow-lg">
          💔 No new users found!
        </h1>
      </div>
    );

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300/60 to-pink-200/60">
      {/* Blurred Background Image Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80')] bg-cover bg-center mix-blend-overlay opacity-30 z-0 " />

      <div className="relative z-10 w-[90%] max-w-md p-6 backdrop-blur-lg bg-white/20 rounded-2xl border border-white/30 shadow-2xl transition-all duration-500 ">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;
