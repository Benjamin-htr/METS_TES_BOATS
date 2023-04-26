import { Card, Flex, Icon, Link } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

export const DesktopMenu = () => {
  return (
    <Flex position="sticky" top="0" as="nav" justify={"center"} zIndex={900}>
      <Card direction={"row"} align={"center"} gap={"15px"} paddingStart={"10px"} paddingEnd={"10px"}>
        <Link to={"/"} as={RouteLink}>
          <Icon boxSize="50px" />
        </Link>
        <Link to={"/new_traject"} as={RouteLink}>
          Nouveau trajet
        </Link>
        <Link to={"/history"} as={RouteLink}>
          Historique
        </Link>
        <Link to={"/profile"} as={RouteLink}>
          Profil
        </Link>
      </Card>
    </Flex>
  );
};
