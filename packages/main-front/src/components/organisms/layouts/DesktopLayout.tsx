import { Outlet } from "react-router-dom";
import { DesktopNavBar } from "../../molecules/NavBar/DesktopNavBar/DesktopNavBar";

export const DesktopLayout = () => {
  return (
    <>
      <DesktopNavBar />
      <Outlet />
    </>
  );
};
