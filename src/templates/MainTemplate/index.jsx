import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export default function MainTemplate({ children }) {
    return(
        <>
            <Header />
            
            {children}

            <Footer />
        </>
    );
}