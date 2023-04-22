import { getCookie } from "./getCookie";

export const isAuth = () => {
  const access_token = getCookie("logged_in");
  console.log(access_token);
  if (access_token) {
    return true;
  }
  return false;
};
