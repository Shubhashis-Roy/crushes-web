import React, { useEffect } from "react";
import { capitalizeFirstLetter, truncateText } from "@utils/string";
import { getAge } from "@utils/age";
import { connectionEnum } from "@enum/connectionEnum";
import { dispatch } from "@redux/store";
import { reviewConnectionRequest } from "@redux/slices/request";
import { dummyImg } from "@constants/images";

interface RequestCardProps {
  requestDetails: chatUserDetailsTypes;
  requestId: string;
  //   setRequests: () => void;
  setRequests: React.Dispatch<React.SetStateAction<requestsDetailsTypes[]>>;
}

const RequestCard: React.FC<RequestCardProps> = ({
  requestDetails,
  requestId,
  setRequests,
}) => {
  const { firstName, lastName, photoUrl, gender, bio, dateOfBirth } =
    requestDetails;

  const reviewRequests = async (status: string, _id: string) => {
    const res = await dispatch(
      reviewConnectionRequest({
        status,
        userId: _id,
      })
    );

    if (res?.status === 200) {
      setRequests((prev) => prev.filter((item) => item._id !== _id));
    }
  };

  return (
    <div
      className="flex items-center m-4 p-4 rounded-lg bg-[#1e1035] text-white 
                 w-[90%] sm:w-[70%] md:w-[50%] mx-auto justify-between gap-4 
                 shadow-lg border border-white/10 hover:bg-[#2a1552] transition-all duration-300"
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

      {/* Buttons */}
      <div className="min-w-[110px]">
        <button
          onClick={() => reviewRequests(connectionEnum.REJECTED, requestId)}
          className="px-5 py-2 rounded-full bg-red-600/80 text-white font-semibold 
                     hover:bg-red-700 transition-all shadow"
        >
          Reject
        </button>

        <button
          onClick={() => reviewRequests(connectionEnum.ACCEPTED, requestId)}
          className="px-5 py-2 ml-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 
                     text-white font-semibold hover:opacity-90 shadow-md transition-all"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
