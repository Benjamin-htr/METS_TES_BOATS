import { getCookie } from "./getCookie";

export const isAuth = () => {
  const logged_in = getCookie("logged_in");
  if (logged_in) {
    return true;
  }
  return false;
};
