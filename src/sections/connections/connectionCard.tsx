import { dummyImg } from "@constants/images";
import { getAge } from "@utils/age";
import { capitalizeFirstLetter, truncateText } from "@utils/string";
import React from "react";

interface ConnectionCardProps {
  connection: chatUserDetailsTypes;
  onChat: (connection: chatUserDetailsTypes) => void;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({
  connection,
  onChat,
}) => {
  const { _id, firstName, lastName, photoUrl, dateOfBirth, gender, bio } =
    connection;

  return (
    <div
      key={_id}
      className="flex items-center m-4 p-4 rounded-lg bg-[#1e1035] text-white w-[90%] sm:w-[70%] md:w-[50%] mx-auto justify-between gap-4 shadow-lg border border-white/10 hover:bg-[#2a1552] transition-all duration-300"
    >
      {/* Profile Image */}
      <div>
        <img
          alt={`${firstName}'s photo`}
          className="w-20 h-20 rounded-full object-cover border-2 border-pink-400 shadow-md"
          src={photoUrl?.length > 0 ? photoUrl[0]?.url : dummyImg}
        />
      </div>

      {/* User Details */}
      <div className="flex-1 text-left">
        <h2 className="font-bold text-xl text-pink-300">
          {firstName} {lastName}
        </h2>
        <div className="flex text-sm text-white/80">
          <p>{getAge(dateOfBirth)}</p>
          {gender && <p className="px-1">•</p>}
          <p>{capitalizeFirstLetter(gender)}</p>
        </div>
        {bio && (
          <p className="text-white/60 text-sm mt-1">{truncateText(bio)}</p>
        )}
      </div>

      {/* Chat Button */}
      <button
        onClick={() => onChat(connection)}
        className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:opacity-90 shadow-md transition-all"
      >
        Chat
      </button>
    </div>
  );
};

export default ConnectionCard;
