import { Box, Icon, Link } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

export const DesktopMenu = () => {
  return (
    <Box position="sticky" top="0" as="nav">
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
    </Box>
  );
};
