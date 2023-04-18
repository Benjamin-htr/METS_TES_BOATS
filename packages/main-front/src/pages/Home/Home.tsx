import { style } from "@macaron-css/core";
import { Flex } from "../../components/atoms/Flex/Flex";
import { MenuLink } from "../../components/atoms/Link/MenuLink";

const homeStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  //backgroundColor: "white",
});

export const Home = () => {
  return (
    <div className={homeStyle}>
      <Flex direction="column">
        <MenuLink to={"/new_traject"}>Nouveau trajet</MenuLink>
        <MenuLink to={"/history"}>Historique</MenuLink>
      </Flex>
    </div>
  );
};
