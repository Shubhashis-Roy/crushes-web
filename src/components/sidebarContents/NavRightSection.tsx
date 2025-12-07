import React, { useEffect, useState } from "react";
import {
  IoVideocamOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constants/path";
import { capitalizeFirstLetter } from "@utils/string";
import { getAvatarFromName } from "@utils/avatar";
import { dispatch } from "@redux/store";
import { getProfile } from "@redux/slices/user";

interface NavRightSectionProps {
  profileDetails: userDetailsTypes | undefined;
  isChatPage: boolean;
  onMenuToggle: () => void;
}

const NavRightSection: React.FC<NavRightSectionProps> = ({
  profileDetails,
  isChatPage,
  onMenuToggle,
}) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<userDetailsTypes | undefined>(
    profileDetails
  );

  async function fetchProfileData() {
    const res = await dispatch(getProfile());
    setUserDetails(res);
  }

  useEffect(() => {
    if (
      !profileDetails ||
      !profileDetails?.firstName ||
      !profileDetails?.photoUrl?.length
    ) {
      fetchProfileData();
    }
  }, []);

  if (!userDetails || !userDetails?.firstName) return null;

  return (
    <div className="flex items-center gap-4">
      {/* ===== Video & Chat icons ===== */}
      {!isChatPage && (
        <>
          <IoVideocamOutline
            size={36}
            onClick={() => navigate(PATH.CHAT)}
            className="text-3xl cursor-pointer font-extrabold text-yellow-300 hover:text-pink-200 transition-all duration-300 hover:scale-110"
          />
          <IoChatbubbleEllipsesOutline
            onClick={() => navigate(PATH.CHAT)}
            className="text-3xl cursor-pointer font-extrabold text-yellow-300 hover:text-pink-200 transition-all duration-300 hover:scale-110"
          />
        </>
      )}

      {/* ===== Greeting text ===== */}
      <span className="text-sm font-semibold text-white/90 hidden sm:block">
        Hi, {capitalizeFirstLetter(userDetails?.firstName)}
      </span>

      {/* ===== User Avatar ===== */}
      <div
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-300 shadow-lg cursor-pointer"
        onClick={onMenuToggle}
      >
        <img
          src={
            userDetails?.photoUrl?.length > 0
              ? userDetails?.photoUrl[0]?.url
              : getAvatarFromName(userDetails?.firstName)
          }
          alt="User"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default NavRightSection;
