import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link as RouteLink, To, useMatch } from "react-router-dom";

interface DesktopMenuLinkProps {
  to: To;
  children: React.ReactNode;
}

export const DesktopNavLink = (props: DesktopMenuLinkProps) => {
  const isMatch = useMatch(typeof props.to === "string" ? props.to : "");

  return (
    <Flex
      height={"100%"}
      pos={"relative"}
      align={"center"}
      _hover={{ bg: "white" }}
      borderRadius={"5px 5px 0 0"}
      as={RouteLink}
      to={props.to}
      padding={"0 10px"}
    >
      {props.children}
      {isMatch && (
        <Box
          height={"5px"}
          bg="#003249"
          as={motion.div}
          layoutId="underline"
          pos={"absolute"}
          w={"100%"}
          bottom={"1px"}
          borderRadius="10px"
          left={0}
        />
      )}
    </Flex>
  );
};
