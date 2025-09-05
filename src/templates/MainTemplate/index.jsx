import { Sidebar } from "../../components/Sidebar";

export default function MainTemplate({ children }) {
    return(
        <>
            <Sidebar />
            
            {children}
        </>
    );
}