import { toast } from "react-toastify";

function messageError(message) {
  toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: false,
    theme: "colored",
    draggable: true,
    progress: undefined,
  });
}
function messageSuccess(message) {
  toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: false,
    theme: "colored",
    draggable: true,
    progress: undefined,
  });
}

export default { messageError, messageSuccess };
