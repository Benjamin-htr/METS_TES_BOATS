import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MenuLink } from "../../../atoms/MenuLink/MenuLink";

interface MenuNavProps {
  isOpen: boolean;
  closeMenu: () => void;
}

export const MenuNav = (props: MenuNavProps) => {
  const delay = {
    open: {
      display: "flex",
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      display: "none",
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 200,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <Flex direction="column" gap="20px" alignItems={"center"} as={motion.nav} variants={delay}>
      <Box as={motion.span} variants={variants} onClick={props.closeMenu}>
        <MenuLink to={"/"}>Accueil</MenuLink>
      </Box>
      <Box as={motion.span} variants={variants} onClick={props.closeMenu}>
        <MenuLink to={"/new_traject"}>Nouveau trajet</MenuLink>
      </Box>
      <Box as={motion.span} variants={variants} onClick={props.closeMenu}>
        <MenuLink to={"/history"}>Historique</MenuLink>
      </Box>
      <Box as={motion.span} variants={variants} onClick={props.closeMenu}>
        <MenuLink to={"/profile"}>Profil</MenuLink>
      </Box>
    </Flex>
  );
};
