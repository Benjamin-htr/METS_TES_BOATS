import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../utils/isAuth";

export const PublicRoute = () => {
  const isAuthed = isAuth();
  if (!isAuthed) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};
