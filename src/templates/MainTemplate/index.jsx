import { Sidebar } from "../../components/Sidebar";

export default function MainTemplate({ children }) {
    return(
        <>
         <Sidebar />
            
        <div className="ml-0 md:ml-60 transition-all">
            {children}
        </div>
        </>
    );
}