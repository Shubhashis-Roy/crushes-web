import { useEffect, useState } from "react";
import { messages } from "../utils/UserJoiningMessage"; // Import the messages array

const ToastPupUpMessage = () => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0); // to restart animation

  useEffect(() => {
    if (!messages.length) return;

    let toastTimer;
    let delayTimer;

    const cycleMessages = () => {
      setVisible(true);
      setProgressKey(Date.now()); // trigger animation restart

      toastTimer = setTimeout(() => {
        setVisible(false);

        delayTimer = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % messages.length);
          cycleMessages();
        }, 500);
      }, 4000);
    };

    cycleMessages();

    return () => {
      clearTimeout(toastTimer);
      clearTimeout(delayTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pb-16">
      <div className="alert shadow-lg bg-pink-100 text-pink-900 animate-slide-in rounded-lg border border-pink-300 p-4 relative w-auto">
        {/* Progress Bar */}
        <div
          key={progressKey} // restart animation each message
          className="absolute top-0 left-0 h-1 bg-pink-500 rounded-t-lg animate-toast-progress"
          style={{ width: "100%" }}
        />
        <span className="font-semibold">{messages[currentIndex]}</span>
      </div>
    </div>
  );
};

export default ToastPupUpMessage;
