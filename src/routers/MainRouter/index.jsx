import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import PublicLayout from "../../layout/PublicLayout";
import MainTemplate from "../../templates/MainTemplate";
import { ForgotPassword } from "../../pages/ForgotPassword";

export function MainRouter() {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAuthenticated = user && user.token;

    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas públicas */}
                <Route element={<PublicLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
                
                {/* Rotas privadas (apenas dashboard e suas páginas) */}
                <Route
                    element={isAuthenticated ? <MainTemplate /> : <Navigate to="/login" />}
                >
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/board-v2" element={<BoardV2 />} />
                    <Route path="/configuracoes" element={<Configuracoes />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/reports" element={<Report />} />
                </Route>

                {/* Rotas de Admin - Suas telas novas */}
                <Route
                    element={isAuthenticated ? <MainTemplate /> : <Navigate to="/login" />}
                >
                    <Route path="/admin" element={<AdminKanban />} />
                    <Route path="/admin/kanban" element={<AdminKanban />} />
                    <Route path="/admin/empresas" element={<AdminEmpresas />} />
                </Route>

                {/* Redirecionamento padrão */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
