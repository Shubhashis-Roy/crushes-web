const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full z-40 bg-white/20 backdrop-blur border-t border-white/30 px-6 py-4 flex flex-col md:flex-row justify-between items-center text-white gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-3">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-love-DEFAULT drop-shadow-lg"
        >
          <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
        </svg>
        <p className="text-sm drop-shadow font-medium">
          © {new Date().getFullYear()} <span className="font-bold">Love Date Crush</span> — All rights reserved
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2">
        <span className="text-sm font-semibold drop-shadow">Follow us on:</span>
        <div className="flex gap-4">
          {[
            {
              href: "https://instagram.com",
              color: "text-pink-500",
              svg: (
                <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zM4 7.75A3.75 3.75 0 0 1 7.75 4h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.5-.75a.75.75 0 0 1 .75.75v.005a.75.75 0 1 1-1.5 0v-.005a.75.75 0 0 1 .75-.75z" />
              ),
            },
            {
              href: "https://twitter.com",
              color: "text-sky-500",
              svg: (
                <path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.6 8.6 0 0 1-2.72 1.04A4.28 4.28 0 0 0 11.4 9a12.14 12.14 0 0 1-8.82-4.47 4.28 4.28 0 0 0 1.32 5.7 4.24 4.24 0 0 1-1.94-.53v.05a4.28 4.28 0 0 0 3.44 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.38-.02-.57A8.7 8.7 0 0 0 24 5.1a8.45 8.45 0 0 1-2.54.7z" />
              ),
            },
            {
              href: "https://facebook.com",
              color: "text-blue-500",
              svg: (
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.62-1.3 1.25V11h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
              ),
            },
          ].map((icon, i) => (
            <a
              key={i}
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${icon.color} transition-transform duration-300 transform hover:scale-125 drop-shadow-lg`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                {icon.svg}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;