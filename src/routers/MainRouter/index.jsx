import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../../pages/Login";
import { Dashboard } from "../../pages/Dashboard";
import { Board } from "../../pages/Board";
import { Calendar } from "../../pages/Calendar";
import { Report } from "../../pages/Report";
import BoardV2 from "../../pages/BoardV2/BoardV2js";
import Configuracoes from "../../pages/Configuracoes";
import AdminEmpresas from '../../pages/Admin/empresas';
import AdminKanban from "../../pages/Admin/Kanban";
import PublicLayout from "../../layout/PublicLayout";
import MainTemplate from "../../templates/MainTemplate";
import { Register } from "../../pages/Register";
import { useAuth } from "../../hooks/useAuth";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import NovaTarefa from "../../pages/NovaTarefa";

export function MainRouter() {
    const { user, loading } = useAuth();
    const isAuthenticated = !!user;

    if (loading) {
        return <SpinnerLoading />
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas públicas */}
                <Route element={<PublicLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* Rotas privadas */}
                <Route
                    element={isAuthenticated ? <MainTemplate /> : <Navigate to="/login" />}
                >
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/board-v2" element={<BoardV2 />} />
                    <Route path="/configuracoes" element={<Configuracoes />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/reports" element={<Report />} />
                    
                    {/* ✅ Nova Rota para Nova Tarefa */}
                    <Route path="/nova-tarefa" element={<NovaTarefa />} />
                </Route>

                {/* Rotas de Admin */}
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
