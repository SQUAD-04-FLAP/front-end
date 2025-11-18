import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { SectorProvider } from "../../provider/SectorProvider";

export default function MainTemplate() {
    return(
        <>
         <Sidebar />
        
        <div className="ml-0 md:ml-20 transition-all">
            <Outlet />
        </div>
        </>
    );
}