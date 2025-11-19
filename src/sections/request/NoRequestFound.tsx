import { capitalizeFirstLetter } from "@utils/string";
import React from "react";

interface NoRequestFoundProps {
  title: string;
  text: string;
}

const NoRequestFound: React.FC<NoRequestFoundProps> = ({ title, text }) => {
  return (
    <div className="flex flex-col items-center mt-40">
      <div className="bg-[#1e1035] border border-white/10 px-6 py-8 rounded-2xl shadow-lg text-center w-[90%] sm:w-[60%]">
        <div className="text-5xl mb-2">😔</div>
        <h1 className="text-3xl font-bold text-pink-300 mb-2">
          No {capitalizeFirstLetter(title)} Found
        </h1>
        <p className="text-white/70">{text}</p>
      </div>
    </div>
  );
};

export default NoRequestFound;
