import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { loveStories } from "@schema/loveStories.schema";
import { FC } from "react";
import { THEME } from "@constants/colors";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

// --- LoveStoryCard definition (kept for context, no changes needed here) ---
interface LoveStoryCardpProps {
  name: string;
  image: string;
  story: string;
}

const LoveStoryCard: FC<LoveStoryCardpProps> = ({ name, image, story }) => (
  <div
    className="w-full shadow-lg rounded-2xl p-4 transition-transform hover:scale-[1.05] duration-300 backdrop-blur-md border border-white/20"
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: THEME.colors.textPrimary,
      boxShadow: "0 8px 24px 0 rgba(31, 38, 135, 0.37)",
    }}
  >
    <img
      src={image}
      alt={name}
      className="w-20 h-20 rounded-full object-cover mx-auto border-4 shadow"
      // Use white/light border for contrast on a dark/transparent card
      style={{ borderColor: "rgba(255, 255, 255, 0.7)" }}
    />
    <h3
      className="text-lg font-semibold text-center mt-4"
      style={{ color: THEME.colors.highlight }} // Use a high-contrast theme color for the name
    >
      {name}
    </h3>
    <p
      className="text-sm text-center mt-2"
      style={{ color: THEME.colors.textPrimary }} // Use primary text color (assuming it's light)
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
// --- End LoveStoryCard definition ---

const RealLoveStories = () => {
  return (
    <section className="px-4 pb-12 z-10 relative mb-10">
      <h2
        className="text-3xl sm:text-4xl font-bold text-center mb-8"
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
        {loveStories.map((story) => (
          // FIX APPLIED: Added py-5 to create vertical space around the card.
          <SwiperSlide key={story.id} className="py-5">
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
