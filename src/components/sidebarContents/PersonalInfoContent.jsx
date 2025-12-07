import { useState } from "react";

const PersonalInfoContent = () => {
  const [sexualOrientation, setSexualOrientation] = useState([]);
  const [pronouns, setPronouns] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [school, setSchool] = useState("");
  const [location, setLocation] = useState("");

  const [drinking, setDrinking] = useState("");
  const [smoking, setSmoking] = useState("");
  const [cannabis, setCannabis] = useState("");
  const [exercise, setExercise] = useState("");
  const [diet, setDiet] = useState("");
  const [pets, setPets] = useState("");
  const [zodiac, setZodiac] = useState("");

  const [intent, setIntent] = useState("");
  const [interests, setInterests] = useState([]);
  const [spotify, setSpotify] = useState("");
  const [instagram, setInstagram] = useState("");
  const [languages, setLanguages] = useState("");
  const [verified, setVerified] = useState(false);

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleSexualOrientation = (option) => {
    setSexualOrientation((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSave = () => {
    const formData = {
      sexualOrientation,
      pronouns,
      jobTitle,
      company,
      school,
      location,
      drinking,
      smoking,
      cannabis,
      exercise,
      diet,
      pets,
      zodiac,
      intent,
      interests,
      spotify,
      instagram,
      languages,
      verified,
    };
    console.log("Saving personal info:", formData);
    // Add API call or save logic here
  };

  const interestOptions = ["Hiking", "Reading", "Music", "Travel", "Cooking"];
  const sexualOptions = ["Straight", "Gay", "Bisexual", "Pansexual", "Asexual"];
  const intentOptions = ["Long-term partner", "Short-term fun", "New friends"];

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 ">
      <h2 className="text-xl font-bold mb-4 text-pink-700">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Info */}
        <fieldset>
          <legend className="font-semibold">Sexual Orientation</legend>
          {sexualOptions.map((opt) => (
            <label key={opt} className="block">
              <input
                type="checkbox"
                checked={sexualOrientation.includes(opt)}
                onChange={() => toggleSexualOrientation(opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </fieldset>

        <div>
          <label className="block font-semibold">Pronouns</label>
          <input
            type="text"
            value={pronouns}
            onChange={(e) => setPronouns(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="e.g., He/Him"
          />
        </div>

        <div>
          <label className="block font-semibold">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div>
          <label className="block font-semibold">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div>
          <label className="block font-semibold">School / University</label>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div>
          <label className="block font-semibold">Location (City)</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Lifestyle */}
        <div>
          <label className="block font-semibold">Drinking</label>
          <select
            value={drinking}
            onChange={(e) => setDrinking(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="">Select</option>
            <option value="Never">Never</option>
            <option value="Socially">Socially</option>
            <option value="Frequently">Frequently</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Smoking</label>
          <select
            value={smoking}
            onChange={(e) => setSmoking(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="">Select</option>
            <option value="No">No</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Frequently">Frequently</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Cannabis Use</label>
          <select
            value={cannabis}
            onChange={(e) => setCannabis(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="">Select</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="Occasionally">Occasionally</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Exercise</label>
          <select
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="">Select</option>
            <option value="Never">Never</option>
            <option value="Sometimes">Sometimes</option>
            <option value="Often">Often</option>
            <option value="Daily">Daily</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Diet</label>
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="">Select</option>
            <option value="Omnivore">Omnivore</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Pets</label>
          <select
            value={pets}
            onChange={(e) => setPets(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="">Select</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="None">None</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Zodiac Sign</label>
          <input
            type="text"
            value={zodiac}
            onChange={(e) => setZodiac(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Relationship Intent */}
        <div className="md:col-span-2">
          <label className="block font-semibold">Looking for</label>
          <select
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="">Select</option>
            {intentOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Interests */}
        <fieldset className="md:col-span-2">
          <legend className="font-semibold">Hobbies / Interests</legend>
          <div className="flex flex-wrap gap-2 mt-1">
            {interestOptions.map((interest) => (
              <button
                type="button"
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-1 rounded-full border ${
                  interests.includes(interest)
                    ? "bg-pink-500 text-white"
                    : "bg-white text-pink-600 border-pink-300"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Media */}
        <div className="md:col-span-2">
          <label className="block font-semibold">
            Spotify Anthem / Top Artists
          </label>
          <input
            type="text"
            value={spotify}
            onChange={(e) => setSpotify(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold">Instagram Handle</label>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold">Languages Spoken</label>
          <input
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div className="flex items-center gap-2 mt-4 md:col-span-2">
          <input
            type="checkbox"
            checked={verified}
            onChange={() => setVerified(!verified)}
          />
          <label className="font-semibold">Verified Badge</label>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoContent;
