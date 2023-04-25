import { Flex, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Fragment, useState } from "react";
import steeringWheel from "../../../assets/icons/steering-wheel.svg";
import classes from "./mobileMenu.module.css";

export const MobileMenu = () => {
  const buttonSize = 85;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      {isOpen && <Flex position={"fixed"} height={"100%"} width={"100%"} top={0} zIndex={900} bg="red"></Flex>}
      <IconButton
        className={classes.ToggleButton}
        icon={<img src={steeringWheel} />}
        aria-label=""
        size={"lg"}
        variant={"unstyled"}
        position={"fixed"}
        height={`${buttonSize}px`}
        width={`${buttonSize}px`}
        right={`-${buttonSize / 4}px`}
        bottom={`-${buttonSize / 4}px`}
        // zIndex={1000}
        onClick={() => setIsOpen(!isOpen)}
        as={motion.button}
        whileTap={{ rotate: 360, transition: { duration: 0.4 } }}
      />
    </Fragment>
  );
};
