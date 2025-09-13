import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../../pages/Home";
import { Login } from "../../pages/Login";
import { Dashboard } from "../../pages/Dashboard";
import { Board } from "../../pages/Board";
import { Calendar } from "../../pages/Calendar";
import { Report } from "../../pages/Report";
import BoardV2 from "../../pages/BoardV2";
import Configuracoes from "../../pages/Configuracoes";

export function MainRouter() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/board" element={<Board />} />
                <Route path="/board-v2" element={<BoardV2 />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/reports" element={<Report />} />
            </Routes>
        </BrowserRouter>
    );
}
