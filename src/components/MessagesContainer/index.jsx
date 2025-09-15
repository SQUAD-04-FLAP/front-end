import { Bounce, ToastContainer } from "react-toastify";

export function MessagesContainer({ children }) {
    return(
        <>

            {children}

            <ToastContainer
                position='top-center'
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Bounce}
            />
        </>
    );
}