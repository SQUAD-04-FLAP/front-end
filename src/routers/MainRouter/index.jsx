import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../../pages/Home";
import { Login } from "../../pages/Login";
import { Dashboard } from "../../pages/Dashboard";
import { Board } from "../../pages/Board";
import { Calendar } from "../../pages/Calendar";
import { Report } from "../../pages/Report";
import BoardV2 from "../../pages/BoardV2";
import Configuracoes from "../../pages/Configuracoes";
import PublicLayout from "../../layout/PublicLayout";
import MainTemplate from "../../templates/MainTemplate";
import { ForgetPassword } from "../../pages/ForgetPassword";

export function MainRouter() {
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas públicas */}
                <Route element={<PublicLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                </Route>
                
                {/* Rotas privadas (apenas dashboard e suas páginas) */}
                <Route
                    element={isAuthenticated ? <MainTemplate /> : <Navigate to="/login" />}
                >
                    {/* Caso tenha a necessidade de criar uma landing page, a rota "/" deve ser colocada em rotas públicas */}
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/board-v2" element={<BoardV2 />} />
                    <Route path="/configuracoes" element={<Configuracoes />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/reports" element={<Report />} />
                </Route>

                {/* Redirecionamento padrão */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
