import { style } from "@macaron-css/core";
import { MenuButton } from "../../components/Button/MenuButton";

const homeStyle = style({
  display: "flex",
  height: "100%",
  backgroundColor: "red",
});

export const Home = () => {
  return (
    <div className={homeStyle}>
      <h1>Home</h1>
      <MenuButton onClick={() => console.log("oui")}>test</MenuButton>
    </div>
  );
};
