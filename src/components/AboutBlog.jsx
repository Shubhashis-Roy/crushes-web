import about from "../../public/about-img.png"


const AboutBlog = () => {
  return (
    <section className="bg-purple-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-5xl font-bold text-white mb-4">About</h2>
        <hr className="border-purple-300" />

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-center relative">

          {/* Left Content */}
          <div className="pr-6">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Connecting Hearts Worldwide
            </h3>
            <p className="text-purple-700 mb-6 leading-relaxed">
              Crushes is a dynamic platform dedicated to helping individuals form deep and meaningful
              connections. Through our innovative features such as chat, video calls, and personalized
              match suggestions, we aim to bridge the gap between strangers and foster the growth of
              friendships and romantic relationships. Join us in creating lasting bonds and memorable
              experiences.
            </p>
            <button className="bg-purple-800 text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-900 transition">
              Learn More
            </button>
          </div>

          {/* Right Image */}
          <div className="flex justify-center mt-20">
            <img
              src={about}
              alt="Holding hands"
              className="rounded-lg w-full max-w-sm shadow-lg object-cover"
            />
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-purple-300 transform -translate-x-1/2"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutBlog;
