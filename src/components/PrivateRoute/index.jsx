// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import { SpinnerLoading } from "../../components/SpinnerLoading";

// export function PrivateRoute({ children, roles }) {
//   const { user, loading } = useAuth();

//   if (loading) return <SpinnerLoading />;

//   if (!user) return <Navigate to="/login" />;

//   if (roles && !roles.includes(user.permissao)) {

//     if (roles && !roles.includes(user.permissao)) {
//     // redireciona baseado na role do usuário
//     if (user.permissao === "ADMIN") {
//         return <Navigate to="/admin" />;
//     } else {
//         return <Navigate to="/" />;
//     }
// }
//   }

//   return children;
// }

import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { SpinnerLoading } from "../../components/SpinnerLoading";

/**
 * Componente de proteção de rota com base na role do usuário.
 * @param {JSX.Element} children - Conteúdo a ser renderizado se autorizado
 * @param {string[]} roles - Lista de permissões permitidas (ex: ["ADMIN"])
 */
export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <SpinnerLoading />;

  if (!user) return <Navigate to="/login" />;

   return children;
}
