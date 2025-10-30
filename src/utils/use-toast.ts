import { toast } from "react-hot-toast";
import { useCallback } from "react";

export function useToast() {
  const toastMessage = useCallback(({ title, description, type = "info" }) => {
    const message = description ? `${title}\n${description}` : title;

    if (type === "error") {
      toast.error(message, {
        style: {
          background: "rgba(45,27,67,0.85)",
          color: "#fff",
          border: "1px solid rgba(255,120,160,0.4)",
          backdropFilter: "blur(10px)",
        },
        position: "bottom-center",
      });
    } else if (type === "success") {
      toast.success(message, {
        style: {
          background: "rgba(45,27,67,0.85)",
          color: "#fff",
          border: "1px solid rgba(130,255,200,0.4)",
          backdropFilter: "blur(10px)",
        },
        position: "bottom-center",
      });
    } else {
      toast(message, {
        style: {
          background: "rgba(45,27,67,0.85)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
        },
        position: "bottom-center",
      });
    }
  }, []);

  return { toast: toastMessage };
}

// {showToast && (
//     <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md border border-pink-300/50 shadow-lg px-6 py-3 rounded-xl text-pink-100 font-medium z-50 animate-fadeInUp">
//       Profile saved successfully 🎉
//     </div>
//   )}

//   {showAgeToast && (
//     <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md border border-red-300/50 shadow-lg px-6 py-3 rounded-xl text-red-100 font-medium z-50 animate-fadeInUp">
//       Age must be between 18 and 100 🚫
//     </div>
//   )}
