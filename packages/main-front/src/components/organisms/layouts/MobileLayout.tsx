import { Outlet } from "react-router-dom";
import { MobileMenu } from "../../molecules/menu/MobileMenu/MobileMenu";

export const MobileLayout = () => {
  return (
    <>
      <Outlet />
      <MobileMenu closeOnClick />
    </>
  );
};
