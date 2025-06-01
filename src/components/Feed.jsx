// Feed.js
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
      <div className="relative min-h-screen flex items-center justify-center ">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80')] bg-cover bg-center mix-blend-overlay opacity-30 z-0" />
        <h1 className="relative z-10 text-white text-3xl font-semibold drop-shadow-lg">
          💔 No new users found!
        </h1>
      </div>
    );

  return (
    <div className="relative w-full h-[660px] flex items-center justify-center">
      {feed.slice(0, 3).map((user, index) => (
        <div
          key={user._id}
          className="absolute w-96 h-[660px] mt-28"
          style={{ zIndex: feed.length - index }}
        >
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
