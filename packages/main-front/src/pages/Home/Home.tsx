import { Flex } from "@chakra-ui/react";
import waveImage from "../../assets/wave.svg";
import { MenuLink } from "../../components/atoms/MenuLink/MenuLink";

export const Home = () => {
  return (
    <Flex h={"100vh"} align={"center"} justify={"center"} backgroundImage={waveImage}>
      <Flex direction="column" color={"white"} gap={"20px"}>
        <MenuLink to={"/new_traject"}>Nouveau trajet</MenuLink>
        <MenuLink to={"/history"}>Historique</MenuLink>
        <MenuLink to={"/profile"}>Profil</MenuLink>
      </Flex>
    </Flex>
  );
};
