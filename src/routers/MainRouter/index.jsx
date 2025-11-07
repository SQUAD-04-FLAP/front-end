// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { Login } from "../../pages/Login";
// import { Dashboard } from "../../pages/Dashboard";
// import { Board } from "../../pages/Board";
// import BoardV2 from '../../pages/BoardV2/';
// import { Calendar } from "../../pages/Calendar";
// import { Report } from "../../pages/Report";
// import Configuracoes from "../../pages/Configuracoes";
// import AdminEmpresas from '../../pages/Admin/empresas';
// import AdminKanban from "../../pages/Admin/Kanban";
// import AdminUsuarios from "../../pages/Admin/Usuarios"; 
// import PublicLayout from "../../layout/PublicLayout";
// import MainTemplate from "../../templates/MainTemplate";
// import { Register } from "../../pages/Register";
// import { SpinnerLoading } from "../../components/SpinnerLoading";
// import NovaTarefa from "../../pages/NovaTarefa";
// import {PrivateRoute} from '../../components/PrivateRoute';
// import { Projects } from "../../pages/Projects";
// import ProjectPage from "../../pages/Projects/ProjectPage";

// export function MainRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Rotas públicas */}
//         <Route element={<PublicLayout />}>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Route>

//         {/* Rotas privadas para usuário normal */}
//         <Route
//           element={
//             <PrivateRoute roles={["USER"]}>
//               <MainTemplate />
//             </PrivateRoute>
//           }
//         >
//           <Route path="/" element={<BoardV2 />} />
//           <Route path="/configuracoes" element={<Configuracoes />} />
//           <Route path="/projects" element={<Projects />} />
//           <Route path="/nova-tarefa" element={<NovaTarefa />} />
          
//           {/* <Route path="/board" element={<Board />} />
//           <Route path="/board-v2" element={<BoardV2 />} />
//           <Route path="/projects/:id" element={<ProjectPage />} />
//           <Route path="/calendar" element={<Calendar />} />
//           <Route path="/reports" element={<Report />} />
//       */}
//         </Route>

//         {/* Rotas privadas para admin */}
//         <Route
//           element={
//             <PrivateRoute roles={["ADMIN"]}>
//               <MainTemplate />
//             </PrivateRoute>
//           }
//         >
//           <Route path="/admin" element={<AdminKanban />} />
//           <Route path="/admin/kanban" element={<AdminKanban />} />
//           <Route path="/admin/empresas" element={<AdminEmpresas />} />
//           <Route path="/admin/usuarios" element={<AdminUsuarios />} />
//         </Route>

//         {/* Redirecionamento padrão */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

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
          <Route path="/nova-tarefa" element={<NovaTarefa />} />
          <Route path="/users" element={<Usuarios />} />
        </Route>

        {/* Redirecionamento padrão */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
