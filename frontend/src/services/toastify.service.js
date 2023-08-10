import { toast } from 'react-toastify';

const config = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
};

export const successToaster = (message) => {
    toast.success(message, config);
}

export const warningToaster = (message) => {
    toast.warn(message, config);
}

export const errorToaster = (message) => {
    toast.error(message, config);
}