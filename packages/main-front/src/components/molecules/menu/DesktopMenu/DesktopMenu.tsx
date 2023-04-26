import { Card, Divider, Flex, Image, Link, Text } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import logo from "../../../../../public/app_icon.png";
import { DesktopMenuLink } from "./DesktopMenuLink";

export const DesktopMenu = () => {
  return (
    <Flex position="sticky" top="0" as="nav" justify={"center"} zIndex={900} padding={"20px 0 10px 0"}>
      <Card
        direction={"row"}
        align={"center"}
        paddingStart={"15px"}
        paddingEnd={"15px"}
        fontWeight={500}
        bg={"rgba(255, 255, 255, 0.85)"}
        backdropFilter={"blur(2px)"}
        height={"3rem"}
      >
        <Link to={"/"} as={RouteLink}>
          <Flex align={"center"} gap={"10px"}>
            <Image src={logo} alt="Logo mets tes boats" boxSize={"30px"} />
            <Text textTransform={"uppercase"} fontWeight={"extrabold"} fontFamily={"Overwave"} fontSize={"xl"}>
              Mets tes boats
            </Text>
          </Flex>
        </Link>
        <Divider orientation="vertical" height={"70%"} m={"0 10px"} />
        <DesktopMenuLink to={"/new_traject"}>Nouveau trajet</DesktopMenuLink>
        <DesktopMenuLink to={"/history"}>Historique</DesktopMenuLink>
        <DesktopMenuLink to={"/profile"}>Profil</DesktopMenuLink>
      </Card>
    </Flex>
  );
};
