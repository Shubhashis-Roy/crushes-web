const NotInterestText = ({ text }: { text: string }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
      <div
        className="
      text-5xl font-extrabold 
      text-white 
      px-4 py-2 
      rotate-[-15deg]
      select-none
    "
        style={{
          WebkitTextStroke: "6px black",
          textShadow: `
        0px 0px 12px #ff2bb4,
        0px 0px 22px #ff2bb4,
        0px 0px 32px #ff2bb4
      `,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default NotInterestText;
