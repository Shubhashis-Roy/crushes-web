import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { loveStories } from "@schema/loveStories.schema";
import { FC } from "react";
import { THEME } from "@constants/colors";

import "swiper/css";
import "swiper/css/autoplay";

// --- LoveStoryCard Props Update ---
interface LoveStoryCardpProps {
  name: string;
  maleImage: string;
  femaleImage: string;
  story: string;
}

const LoveStoryCard: FC<LoveStoryCardpProps> = ({
  name,
  maleImage,
  femaleImage,
  story,
}) => (
  <div
    className="w-full shadow-lg rounded-2xl p-4 transition-transform hover:scale-[1.05] duration-300 backdrop-blur-md border border-white/20 flex flex-col items-center text-center"
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: THEME.colors.textPrimary,
      boxShadow: "0 8px 24px 0 rgba(31, 38, 135, 0.37)",
    }}
  >
    {/* ------------------------------------------------------------------ */}
    {/* ✨ NEW: Container for Two Overlapping Circles */}
    {/* ------------------------------------------------------------------ */}
    <div className="relative w-32 h-16 mb-6">
      <img
        src={femaleImage}
        alt="Female Profile"
        className="absolute top-0 left-0 w-16 h-16 rounded-full object-cover shadow-md z-10"
        style={{
          borderColor: THEME.colors.highlight,
          borderWidth: 3,
        }}
      />

      <img
        src={maleImage}
        alt="Male Profile"
        className="absolute top-0 right-0 w-16 h-16 rounded-full object-cover shadow-lg z-20"
        style={{
          left: "45px",
          borderColor: "rgba(255, 255, 255, 0.7)",
          borderWidth: 3,
          transform: "translateX(10px)",
        }}
      />
    </div>
    {/* ------------------------------------------------------------------ */}

    <h3
      className="text-lg font-semibold text-center mt-4"
      style={{ color: THEME.colors.highlight }}
    >
      {name}
    </h3>
    <p
      className="text-sm text-center mt-2"
      style={{ color: THEME.colors.textPrimary }}
    >
      {story}
    </p>
    <div
      className="mt-4 flex justify-center gap-2 text-xl animate-pulse"
      style={{ color: THEME.colors.accent }}
    >
      ❤️ 💑 💕
    </div>
  </div>
);

// --- RealLoveStories component (needs props update) ---

const RealLoveStories = () => {
  return (
    <section className="px-4 pb-12 z-10 relative mb-10">
      <h2
        className="text-3xl sm:text-4xl font-bold text-center mb-8 px-4"
        style={{ color: THEME.colors.highlight }}
      >
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
        {loveStories?.map((story) => (
          <SwiperSlide key={story.id} className="py-5">
            <LoveStoryCard
              name={story.name}
              story={story.story}
              // ✨ IMPORTANT: Update your data to provide these keys
              maleImage={story.maleImage}
              femaleImage={story.femaleImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RealLoveStories;
