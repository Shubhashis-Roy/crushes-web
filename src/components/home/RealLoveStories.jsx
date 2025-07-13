// import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { loveStories } from "../../schema/loveStories";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

// LoveStoryCard component
const LoveStoryCard = ({ name, image, story }) => (
  <div className="w-full bg-gradient-to-br from-pink-100 via-red-100 to-pink-200 shadow-lg rounded-2xl p-4 transition-transform hover:scale-105 duration-300">
    <img
      src={image}
      alt={name}
      className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-white shadow"
    />
    <h3 className="text-lg font-semibold text-center text-pink-800 mt-4">
      {name}
    </h3>
    <p className="text-sm text-center text-pink-700 mt-2">{story}</p>
    <div className="mt-4 flex justify-center gap-2 text-xl text-pink-500 animate-pulse">
      ❤️ 💑 💕
    </div>
  </div>
);

// Prop validation
LoveStoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  story: PropTypes.string.isRequired,
};

const RealLoveStories = () => {
  return (
    // <section className="bg-white py-12 px-4 z-10 relative mb-16">
    <section className="px-4 pb-12 z-10 relative mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8">
        ❤️ Real Love Stories
      </h2>

      <Swiper
        modules={[Autoplay]}
        loop={true}
        spaceBetween={24}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {loveStories.map((story) => (
          <SwiperSlide key={story.id}>
            <LoveStoryCard
              name={story.name}
              image={story.image}
              story={story.story}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RealLoveStories;
