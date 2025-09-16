import { toast } from "react-toastify";

export const showMessage = {
    success: (msg) => toast.success(msg),
    error: (msg) => toast.error(msg),
    warn: (msg) => toast.warning(msg),
    info: (msg) => toast.info(msg),
    dismiss: (msg) => toast.dismiss(msg),
}