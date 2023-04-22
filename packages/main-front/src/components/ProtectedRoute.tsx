import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../utils/isAuth";

export const ProtectedRoute = () => {
  const isAuthed = isAuth();
  if (!isAuthed) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
