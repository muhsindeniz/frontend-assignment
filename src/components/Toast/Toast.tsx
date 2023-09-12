import { useEffect } from "react";
import { useToast } from "~/context/AppDesignContext";
import { Toast } from "./types";

const ToastComponent: React.FC<Toast> = ({
  id,
  title,
  icon,
  type,
  duration = 5000,
  position = "top-right",
}) => {
  const { hideToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      hideToast(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [hideToast, id, duration]);

  const toastClasses: Record<
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "left-center"
    | "bottom-center"
    | "right-center",
    string
  > = {
    "top-left": "top-7 top-7",
    "top-right": "top-7 right-7",
    "bottom-left": "bottom-5 top-7",
    "bottom-right": "bottom-5 right-7",
    "top-center": "top-7 left-1/2 transform -translate-x-1/2",
    "left-center": "top-7 top-1/2 transform -translate-y-1/2",
    "bottom-center": "bottom-5 left-1/2 transform -translate-x-1/2",
    "right-center": "right-7 top-1/2 transform -translate-y-1/2",
  };

  return (
    <div
      className={`fixed ${toastClasses[position]} bg-gray-800 flex items-center rounded px-7 py-3 text-white shadow-lg`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </div>
  );
};

export default ToastComponent;
