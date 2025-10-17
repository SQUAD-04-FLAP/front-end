import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { SpinnerLoading } from "../../components/SpinnerLoading";

export function PrivateRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) return <SpinnerLoading />;

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.permissao)) {

    if (roles && !roles.includes(user.permissao)) {
    // redireciona baseado na role do usuário
    if (user.permissao === "ADMIN") {
        return <Navigate to="/admin" />;
    } else {
        return <Navigate to="/" />;
    }
}
  }

  return children;
}