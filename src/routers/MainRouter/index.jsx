
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { Login } from "../../pages/Login";
import { Register } from "../../pages/Register";
import PublicLayout from "../../layout/PublicLayout";
import MainTemplate from "../../templates/MainTemplate";
import { PrivateRoute } from "../../components/PrivateRoute";

import { SpinnerLoading } from "../../components/SpinnerLoading";

import BoardV2 from "../../pages/BoardV2";
import Configuracoes from "../../pages/Configuracoes";
import NovaTarefa from "../../pages/NovaTarefa";
import { Projects } from "../../pages/Projects";
import { Usuarios } from '../../pages/Usuarios';
import { Framers } from "../../pages/Framers";
import ProjectPage from "../../pages/Projects/ProjectPage";

export function MainRouter() {
  const { loading } = useAuth();

  if (loading) return <SpinnerLoading />;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route
          element={
            <PrivateRoute roles={["USER", "ADMIN"]}>
              <MainTemplate />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<BoardV2 />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/nova-tarefa" element={<NovaTarefa />} />
          <Route path="/users" element={<Usuarios />} />
          <Route path="/framers" element={<Framers />} />
        </Route>

        {/* Redirecionamento padrão */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
