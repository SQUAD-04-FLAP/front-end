import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../../pages/Home";
import { Login } from "../../pages/Login";
import { Dashboard } from "../../pages/Dashboard";
import { Board } from "../../pages/Board";
import { Calendar } from "../../pages/Calendar";
import { Report } from "../../pages/Report";
import BoardV2 from "../../pages/BoardV2";
import Configuracoes from "../../pages/Configuracoes";
import AdminEmpresas from "../../pages/Admin/Empresas";
import AdminKanban from "../../pages/Admin/Kanban";

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
                
                {/* Rotas de Admin - Só Kanban e Empresas */}
                <Route path="/admin" element={<AdminKanban />} />
                <Route path="/admin/kanban" element={<AdminKanban />} />
                <Route path="/admin/empresas" element={<AdminEmpresas />} />
            </Routes>
        </BrowserRouter>
    );
}
