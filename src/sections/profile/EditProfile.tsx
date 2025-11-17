import { updateUserProfile } from "@redux/slices/user";
import { dispatch } from "@redux/store";
import { getAge } from "@utils/age";
import React, { useEffect, useState } from "react";

interface EditProfileProps {
  user: profileDetailsTypes;
}

const EditProfile: React.FC<EditProfileProps> = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState<string | null>(null);
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.bio || "");

  const saveProfile = async () => {
    const bodyPayload = {
      firstName,
      lastName,
      age,
      gender: gender.toLowerCase(),
      about,
    };

    dispatch(updateUserProfile(bodyPayload));
  };

  useEffect(() => {
    const result = getAge(user?.dateOfBirth);
    setAge(String(result));
  }, [user?.dateOfBirth]);

  const isEdited =
    firstName !== user.firstName ||
    lastName !== user.lastName ||
    age !== (age || "") ||
    gender !== (user.gender || "") ||
    about !== (user.bio || "");

  return (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full bg-white/10 text-white font-semibold px-4 py-3 rounded-lg border border-white/20 backdrop-blur-md placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full bg-white/10 text-white font-semibold px-4 py-3 rounded-lg border border-white/20 backdrop-blur-md placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="number"
          placeholder="Age"
          value={Number(age)}
          onChange={(e) => setAge(e.target.value)}
          min="18"
          max="100"
          className="w-full bg-white/10 text-white font-semibold px-4 py-3 rounded-lg border border-white/20 backdrop-blur-md placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        {/* ================ Custom Gender Dropdown ================ */}
        <div className="relative w-full">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="appearance-none w-full bg-white/10 text-white font-semibold px-4 py-3 rounded-lg border border-white/20 backdrop-blur-md placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 pr-10 cursor-pointer"
          >
            <option value="" disabled className="text-gray-400">
              Select your gender
            </option>
            <option value="male" className="text-gray-800">
              Man
            </option>
            <option value="female" className="text-gray-800">
              Woman
            </option>
            <option value="other" className="text-gray-800">
              Other
            </option>
          </select>

          {/* ================ Custom dropdown arrow ================ */}
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300 pointer-events-none"
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

        <div className="col-span-1 sm:col-span-2">
          <textarea
            placeholder="About You"
            value={about}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (inputValue.length <= 40) setAbout(inputValue);
            }}
            rows={4}
            className="w-full bg-white/10 text-white font-semibold px-4 py-3 rounded-lg border border-white/20 backdrop-blur-md placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
          />
          <p className="text-right text-xs text-white/50 mt-1">
            {about.length} / 40 characters
          </p>
        </div>
      </div>

      {/* ============ Save Button ============ */}
      <button
        onClick={saveProfile}
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
  );
};

export default EditProfile;
