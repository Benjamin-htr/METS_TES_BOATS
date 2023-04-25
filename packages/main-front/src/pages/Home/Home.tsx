import { Flex } from "@chakra-ui/react";
import waveImage from "../../assets/wave.svg";
import { MenuLink } from "../../components/atoms/MenuLink/MenuLink";

export const Home = () => {
  return (
    <Flex align={"center"} justify={"center"} height={"100%"} backgroundImage={waveImage}>
      <Flex direction="column" color={"white"} gap={"20px"}>
        <MenuLink to={"/new_traject"}>Nouveau trajet</MenuLink>
        <MenuLink to={"/history"}>Historique</MenuLink>
        <MenuLink to={"/profile"}>Profil</MenuLink>
      </Flex>
    </Flex>
  );
};
