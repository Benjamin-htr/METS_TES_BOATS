import { Outlet } from "react-router-dom";

export const DesktopLayout = () => {
  return (
    <>
      <div>Menu navigation</div>
      <Outlet />
    </>
  );
};
