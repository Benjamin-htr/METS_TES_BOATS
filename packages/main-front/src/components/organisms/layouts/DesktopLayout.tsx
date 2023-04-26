import { Outlet } from "react-router-dom";
import { DesktopMenu } from "../../molecules/menu/DesktopMenu/DesktopMenu";

export const DesktopLayout = () => {
  return (
    <>
      <DesktopMenu />
      <Outlet />
    </>
  );
};
