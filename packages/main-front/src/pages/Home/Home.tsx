import { Flex } from "@chakra-ui/react";
import { MenuLink } from "../../components/atoms/MenuLink/MenuLink";
import classes from "./home.module.css";

export const Home = () => {
  return (
    <div className={classes.home}>
      <Flex direction="column">
        <MenuLink to={"/new_traject"}>Nouveau trajet</MenuLink>
        <MenuLink to={"/history"}>Historique</MenuLink>
        <MenuLink to={"/profile"}>Profil</MenuLink>
      </Flex>
    </div>
  );
};
