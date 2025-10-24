import { toast } from "react-toastify";

export const showMessage = {
  success: (msg, quick = false) =>
    toast.success(msg, {
      autoClose: quick ? 1000 : 3000, // 1s se for rápido, 3s padrão
      hideProgressBar: false,
      pauseOnHover: true,
      closeOnClick: true,
      draggable: true,
    }),

  error: (msg, quick = false) =>
    toast.error(msg, {
      autoClose: quick ? 1000 : 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      closeOnClick: true,
      draggable: true,
    }),

  warn: (msg, quick = false) =>
    toast.warning(msg, {
      autoClose: quick ? 1000 : 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      closeOnClick: true,
      draggable: true,
    }),

  info: (msg, quick = false) =>
    toast.info(msg, {
      autoClose: quick ? 1000 : 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      closeOnClick: true,
      draggable: true,
    }),

  dismiss: () => toast.dismiss(),
};
