import React, { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Star,
  Users,
} from "lucide-react";
import { dispatch } from "@redux/store";
import { getProfile } from "@redux/slices/user";
import { capitalizeFirstLetter } from "@utils/string";

const PreviewStep = () => {
  const [profileDetails, setProfileDetails] = useState<profileDetailsTypes>();

  useEffect(() => {
    async function fetchProfile() {
      const res = await dispatch(getProfile());
      setProfileDetails(res);
    }

    fetchProfile();
  }, []);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const mainPhotoUrl =
    profileDetails?.photoUrl?.length && profileDetails?.photoUrl?.length > 0
      ? typeof profileDetails.photoUrl[0] === "string"
        ? profileDetails.photoUrl[0]
        : URL.createObjectURL(profileDetails.photoUrl[0])
      : null;

  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-4">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold mb-3 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
          Profile{" "}
          <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            Preview
          </span>
        </h2>
        <p className="text-white/80 text-base">
          Here’s how your profile will look to others ✨
        </p>
      </div>

      {/* Profile Card */}
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden backdrop-blur-xl border border-white/20 shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] bg-white/10">
        {/* Main Photo */}
        <div className="relative h-80 overflow-hidden">
          {mainPhotoUrl ? (
            <img
              src={mainPhotoUrl}
              alt="Profile"
              className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-400/20 to-purple-600/20">
              <Avatar className="w-28 h-28">
                <AvatarFallback className="text-3xl bg-pink-500/20 text-white">
                  {getInitials(profileDetails?.firstName || "U")}
                </AvatarFallback>
              </Avatar>
            </div>
          )}

          {/* Photo count */}
          {profileDetails?.photoUrl?.length && (
            <div className="absolute bottom-4 right-4 bg-black/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              1/{profileDetails?.photoUrl?.length}
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Info */}
        <div className="p-6 text-left">
          {/* Name & location */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white">
                {capitalizeFirstLetter(profileDetails?.firstName) || "User"}{" "}
                {profileDetails?.dateOfBirth && (
                  <span className="text-white/70 text-lg">
                    •{" "}
                    {new Date().getFullYear() -
                      new Date(profileDetails?.dateOfBirth).getFullYear()}
                  </span>
                )}
              </h3>
              {/* {profileDetails?.zodiacSign && (
                <p className="text-sm text-pink-300">♑ {profileDetails?.zodiacSign}</p>
              )} */}
            </div>
            <div className="flex items-center text-sm text-white/70">
              <MapPin className="w-4 h-4 mr-1 text-pink-300" />
              <span>
                {capitalizeFirstLetter(profileDetails?.city) || "Unknown"}
              </span>
            </div>
          </div>

          {/* Bio */}
          {profileDetails?.bio && (
            <p className="text-white/90 mb-4 text-[15px] leading-relaxed">
              “{profileDetails?.bio}”
            </p>
          )}

          {/* Profession & Education */}
          <div className="space-y-2 mb-4">
            {profileDetails?.profession && (
              <div className="flex items-center text-sm text-white/70">
                <Briefcase className="w-4 h-4 mr-2 text-purple-300" />
                <span>
                  {capitalizeFirstLetter(profileDetails?.profession)}
                  {profileDetails?.profession &&
                    ` at ${capitalizeFirstLetter(
                      profileDetails?.organization
                    )}`}
                </span>
              </div>
            )}
            {profileDetails?.education && (
              <div className="flex items-center text-sm text-white/70">
                <GraduationCap className="w-4 h-4 mr-2 text-indigo-300" />
                <span>{capitalizeFirstLetter(profileDetails?.education)}</span>
              </div>
            )}
          </div>

          {/* Looking for */}
          {profileDetails?.lookingFor?.length &&
            profileDetails?.lookingFor?.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center text-sm text-white/70 mb-2">
                  <Heart className="w-4 h-4 mr-2 text-pink-300" />
                  <span>Looking for</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileDetails?.lookingFor.map((item, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-white/30 text-white text-xs bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"
                    >
                      {item.replace("-", " ")}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

          {/* Interests */}
          {profileDetails?.interest?.length &&
            profileDetails?.interest?.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center text-sm text-white/70 mb-2">
                  <Star className="w-4 h-4 mr-2 text-yellow-300" />
                  <span>Interests</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileDetails?.interest?.slice(0, 6).map((hobby, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-white/20 text-white/90 text-xs bg-white/5 px-3 py-1 rounded-full"
                    >
                      {capitalizeFirstLetter(hobby)}
                    </Badge>
                  ))}
                  {profileDetails?.interest?.length > 6 && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-white/10 text-white"
                    >
                      +{profileDetails?.interest?.length - 6} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

          {/* Preferences */}
          <div className="flex items-center text-xs text-white/60 mt-4">
            <Users className="w-3 h-3 mr-2 text-purple-300" />
            <span>
              Interested in {profileDetails?.interest.join(", ") || "All"} •
              Ages {profileDetails?.preferredAge?.min}–
              {profileDetails?.preferredAge?.max} • Within{" "}
              {profileDetails?.preferredDistance}
              km
            </span>
          </div>
        </div>
      </div>

      {/* ✨ Note only (no buttons) */}
      <p className="text-xs text-white/60 text-center mt-6">
        ✨ You can always edit your profile later in Settings
      </p>
    </div>
  );
};

export default PreviewStep;
