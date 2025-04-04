import { toast } from "react-toastify";

// Reusable Toast Function
export const showToast = (type, message, options = {}) => {
  const defaultOptions = {
    position: toast.POSITION, // Default position
    autoClose: 3000, // Default auto-close in 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: "#161B22", // Default background color
      color: "#fff", // Default text color
    },
  };

  const config = { ...defaultOptions, ...options };

  switch (type) {
    case "success":
      toast.success(message, config);
      break;
    case "error":
      toast.error(message, config);
      break;
    case "info":
      toast.info(message, config);
      break;
    case "warning":
      toast.warn(message, config);
      break;
    default:
      toast(message, config); // Default toast
  }
};
