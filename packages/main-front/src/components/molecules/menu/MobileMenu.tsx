import { Flex, IconButton } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useState } from "react";
import steeringWheel from "../../../assets/icons/steering-wheel.svg";
import { MenuLink } from "../../atoms/MenuLink/MenuLink";
import classes from "./mobileMenu.module.css";

export const MobileMenu = () => {
  const buttonSize = 85;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <AnimatePresence mode="wait">
        {isOpen && (
          <Flex
            position={"fixed"}
            height={"100%"}
            width={"100%"}
            bottom={0}
            right={0}
            zIndex={900}
            bg="rgb(180, 195, 220)"
            as={motion.div}
            animate={{ width: "100%", height: "100%", opacity: 1, transition: { duration: 0.4 } }}
            initial={{ width: 0, height: 0, opacity: 0 }}
            exit={{ width: 0, height: 0, opacity: 0, transition: { duration: 0.4 } }}
          >
            <Flex direction="column">
              <MenuLink to={"/new_traject"}>Nouveau trajet</MenuLink>
              <MenuLink to={"/history"}>Historique</MenuLink>
              <MenuLink to={"/profile"}>Profil</MenuLink>
            </Flex>
          </Flex>
        )}
      </AnimatePresence>
      <IconButton
        className={classes.ToggleButton}
        icon={<img src={steeringWheel} />}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        size={"lg"}
        variant={"unstyled"}
        position={"fixed"}
        height={`${buttonSize}px`}
        width={`${buttonSize}px`}
        right={`-${buttonSize / 4}px`}
        bottom={`-${buttonSize / 4}px`}
        zIndex={1000}
        onClick={() => setIsOpen(!isOpen)}
        as={motion.button}
        whileTap={{ rotate: 360, transition: { duration: 0.4 } }}
      />
    </Fragment>
  );
};
