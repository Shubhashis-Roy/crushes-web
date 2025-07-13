import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import PropTypes from "prop-types";

const EditProfileContent = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  // const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  // const [gender, setGender] = useState(user.gender || "");

  const [about, setAbout] = useState(user.about || "");
  const [showToast, setShowToast] = useState(false);
  const [showAgeToast, setShowAgeToast] = useState(false); // 👈 New state
  const dispatch = useDispatch();
  // const fileInputRef = useRef(null);

  const saveProfile = async () => {
    // Age validation
    const ageNumber = parseInt(age);
    if (isNaN(ageNumber) || ageNumber < 18 || ageNumber > 100) {
      setShowAgeToast(true);
      setTimeout(() => setShowAgeToast(false), 3000);
      return;
    }

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          // photoUrl,
          age,
          gender: gender.toLowerCase(),
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const isEdited =
    firstName !== user.firstName ||
    lastName !== user.lastName ||
    // photoUrl !== user.photoUrl ||
    age !== (user.age || "") ||
    gender !== (user.gender || "") ||
    about !== (user.about || "");

  return (
    <div className="flex overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className=" mx-auto bg-white p-3">
          <div className="flex flex-col items-center relative">
            <img
              src={
                Array.isArray(user.photoUrl)
                  ? user.photoUrl[0] || "/default-avatar.png"
                  : user.photoUrl || "/default-avatar.png"
              }
              alt="User"
              className="w-36 h-36 rounded-full object-cover border-4 border-pink-300 shadow-lg"
            />

            <p className="text-sm p-3 text-gray-500">
              Let the world know who you are 🌸
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="18"
              max="100"
              className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Man</option>
              <option value="female">Woman</option>
              <option value="other">Other</option>
            </select>
            <div className="col-span-1 sm:col-span-2">
              <textarea
                placeholder="About You"
                value={about}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue.length <= 40) {
                    setAbout(inputValue);
                  } else {
                    setAbout(inputValue.slice(0, 40));
                  }
                }}
                rows={4}
                className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
              />
              <p className="text-right text-xs text-gray-400 mt-1">
                {about.length} / 40 characters
              </p>
            </div>
          </div>

          <button
            onClick={saveProfile}
            disabled={!isEdited}
            className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${
              isEdited
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Save Profile
          </button>
        </div>

        {/* ✅ Success Toast */}
        {showToast && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-pink-200 shadow-lg px-6 py-3 rounded-xl text-pink-700 font-medium z-50 animate-fadeInUp">
            Profile saved successfully 🎉
          </div>
        )}

        {/* ❌ Age Error Toast */}
        {showAgeToast && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-red-200 shadow-lg px-6 py-3 rounded-xl text-red-700 font-medium z-50 animate-fadeInUp">
            Age must be between 18 and 100 🚫
          </div>
        )}
      </div>
    </div>
  );
};

EditProfileContent.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photoUrl: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    about: PropTypes.string,
  }).isRequired,
};

export default EditProfileContent;
