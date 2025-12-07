import { UsersFeedback } from "@schema/UsersFeedback.schema";
import { useEffect, useState } from "react";

const ToastPupUpMessage = () => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    if (!UsersFeedback.length) return;

    let toastTimer: ReturnType<typeof setTimeout>;
    let delayTimer: ReturnType<typeof setTimeout>;

    const cycleMessages = () => {
      setVisible(true);
      setProgressKey(Date.now());

      toastTimer = setTimeout(() => {
        setVisible(false);

        delayTimer = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % UsersFeedback.length);
          cycleMessages();
        }, 750);
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
    // <div className="fixed bottom-6 right-6 z-50 pb-10">
    <div className="fixed bottom-6 right-6 z-50 pb-10">
      <div className="alert shadow-lg bg-pink-100 text-pink-900 animate-slide-in rounded-lg border border-pink-300 p-4 relative w-auto">
        {/* Progress Bar */}
        <div
          key={progressKey}
          className="absolute top-0 left-0 h-1 bg-pink-500 rounded-t-lg animate-toast-progress"
          style={{ width: "100%" }}
        />
        <span className="font-semibold">{UsersFeedback[currentIndex]}</span>
      </div>
    </div>
  );
};

export default ToastPupUpMessage;
