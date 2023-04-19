import { style } from "@macaron-css/core";
import { LoginForm } from "./LoginForm";

const loginStyle = style({
  height: "100%",
  backgroundColor: "rgb(180, 195, 220)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const Login = () => {
  return (
    <div className={loginStyle}>
      <LoginForm />
    </div>
  );
};
