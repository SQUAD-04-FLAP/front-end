import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";

export default function MainTemplate() {
    return(
        <>
         <Sidebar />
            
        <div className="ml-0 md:ml-60 transition-all">
            <Outlet />
        </div>
        </>
    );
}