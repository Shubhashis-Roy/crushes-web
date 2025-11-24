import { updateUserProfile } from "@redux/slices/user";
import { dispatch } from "@redux/store";
import { formatToBackend, formatToDisplay } from "@utils/age";
import { showToast } from "@utils/toast";
import React, { useEffect, useState } from "react";

interface EditProfileProps {
  user: profileDetailsTypes;
}

const EditProfile: React.FC<EditProfileProps> = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(
    formatToDisplay(user?.dateOfBirth) || ""
  );
  const [profession, setProfession] = useState(user?.profession);
  const [education, setEducation] = useState(user?.education);
  const [organization, setOrganization] = useState(user?.organization);
  const [city, setCity] = useState(user?.city);
  const [gender, setGender] = useState(user?.gender || "");
  const [bio, setbio] = useState(user?.bio || "");
  const [isEdited, setIsEdited] = useState(true);

  useEffect(() => {
    setIsEdited(
      firstName !== user.firstName ||
        lastName !== user.lastName ||
        dateOfBirth !== formatToDisplay(user.dateOfBirth) ||
        profession !== (user.profession || "") ||
        education !== (user.education || "") ||
        organization !== (user.organization || "") ||
        city !== (user.city || "") ||
        gender !== (user.gender || "") ||
        bio !== (user.bio || "")
    );
  }, [
    firstName,
    lastName,
    dateOfBirth,
    profession,
    education,
    organization,
    city,
    gender,
    bio,
  ]);

  const saveProfile = async () => {
    const bodyPayload = {
      firstName,
      lastName,
      dateOfBirth: formatToBackend(dateOfBirth),
      gender: gender.toLowerCase(),
      city,
      profession,
      education,
      organization,
      bio,
    };

    const res = await dispatch(updateUserProfile(bodyPayload));
    if (res?.status === 200) {
      showToast("Your profile has been updated successfully!");
      setIsEdited(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveProfile();
      }}
    >
      <div className="flex flex-col items-center w-full text-white">
        {/* ============ Avatar ============ */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={user.photoUrl[0]?.url}
            alt="User"
            className="w-36 h-36 rounded-full object-cover border-4 border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.6)]"
          />
          <p className="text-sm text-white/70 mt-4">
            Let the world know who you are 🌸
          </p>
        </div>

        {/* ============ Form ============ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label className="text-white/80 font-medium text-sm">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-white/10 text-white font-semibold px-4 py-3 
                 rounded-lg border border-white/20 backdrop-blur-md 
                 placeholder:text-white/40 focus:outline-none 
                 focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-white/80 font-medium text-sm">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-white/10 text-white font-semibold px-4 py-3 
                 rounded-lg border border-white/20 backdrop-blur-md 
                 placeholder:text-white/40 focus:outline-none 
                 focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your last name"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-2">
            <label className="text-white/80 font-medium text-sm">
              Date of Birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full bg-white/10 text-white font-semibold px-4 py-3 
               rounded-lg border border-white/20 backdrop-blur-md 
               placeholder:text-white/40 focus:outline-none 
               focus:ring-2 focus:ring-pink-400 cursor-pointer"
            />
          </div>

          {/* Gender Dropdown */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-white/80 font-medium text-sm">Gender</label>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="appearance-none w-full bg-white/10 text-white font-semibold
                 px-4 py-3 rounded-lg border border-white/20 backdrop-blur-md
                 focus:outline-none focus:ring-2 focus:ring-pink-400 pr-10 cursor-pointer"
            >
              <option value="" disabled className="text-gray-400">
                Select gender
              </option>
              <option value="male" className="text-gray-800">
                Man
              </option>
              <option value="female" className="text-gray-800">
                Woman
              </option>
              <option value="non-binary" className="text-gray-800">
                Non-binary
              </option>
              <option value="custom" className="text-gray-800">
                Custom
              </option>
              <option value="other" className="text-gray-800">
                Other
              </option>
            </select>

            {/* Custom arrow */}
            <svg
              className="absolute right-4 top-[58%] -translate-y-1/2 w-4 h-4 text-pink-300 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </div>

          {/* City */}
          <div className="flex flex-col gap-2">
            <label className="text-white/80 font-medium text-sm">City</label>
            <input
              type="text"
              value={city ? city?.charAt(0).toUpperCase() + city?.slice(1) : ""}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-white/10 text-white font-semibold px-4 py-3 
                 rounded-lg border border-white/20 backdrop-blur-md 
                 placeholder:text-white/40 focus:outline-none 
                 focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your city"
            />
          </div>

          {/* Profession */}
          <div className="flex flex-col gap-2">
            <label className="text-white/80 font-medium text-sm">
              Profession
            </label>
            <input
              type="text"
              value={
                profession
                  ? profession?.charAt(0).toUpperCase() + profession?.slice(1)
                  : ""
              }
              onChange={(e) => setProfession(e.target.value)}
              className="w-full bg-white/10 text-white font-semibold px-4 py-3 
                 rounded-lg border border-white/20 backdrop-blur-md 
                 placeholder:text-white/40 focus:outline-none 
                 focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your profession"
            />
          </div>

          {/* education*/}
          <div className="flex flex-col gap-2">
            <label className="text-white/80 font-medium text-sm">
              Education
            </label>
            <input
              type="text"
              value={
                education
                  ? education?.charAt(0).toUpperCase() + education?.slice(1)
                  : ""
              }
              onChange={(e) => setEducation(e.target.value)}
              className="w-full bg-white/10 text-white font-semibold px-4 py-3 
                 rounded-lg border border-white/20 backdrop-blur-md 
                 placeholder:text-white/40 focus:outline-none 
                 focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your education"
            />
          </div>

          {/* organization*/}
          <div className="flex flex-col gap-2">
            <label className="text-white/80 font-medium text-sm">
              Organization
            </label>
            <input
              type="text"
              value={
                organization
                  ? organization?.charAt(0).toUpperCase() +
                    organization?.slice(1)
                  : ""
              }
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full bg-white/10 text-white font-semibold px-4 py-3 
                 rounded-lg border border-white/20 backdrop-blur-md 
                 placeholder:text-white/40 focus:outline-none 
                 focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your organization"
            />
          </div>

          {/* Bio */}
          <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
            <label className="text-white/80 font-medium text-sm">
              Bio <span className="text-white/50">(max 40 characters)</span>
            </label>

            <textarea
              value={bio}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue.length <= 40) setbio(inputValue);
              }}
              rows={3}
              className="w-full bg-white/10 text-white font-semibold px-4 py-3 
                 rounded-lg border border-white/20 backdrop-blur-md 
                 placeholder:text-white/40 focus:outline-none 
                 focus:ring-2 focus:ring-pink-400 resize-none"
              placeholder="Write a short bio..."
            />

            <p className="text-right text-xs text-white/50">
              {bio?.length} / 40 characters
            </p>
          </div>
        </div>

        {/* ============ Save Button ============ */}
        <button
          type="submit"
          disabled={!isEdited}
          className={`mt-8 w-full max-w-3xl py-3 rounded-lg font-semibold transition-all ${
            isEdited
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:opacity-90"
              : "bg-white/10 text-white/50 cursor-not-allowed"
          }`}
        >
          Save Profile
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
