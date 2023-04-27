import { Outlet } from "react-router-dom";
import { MobileNavBar } from "../../molecules/NavBar/MobileNavBar/MobileNavBar";

export const MobileLayout = () => {
  return (
    <>
      <Outlet />
      <MobileNavBar closeOnClick />
    </>
  );
};
