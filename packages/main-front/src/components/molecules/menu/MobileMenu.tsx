import { IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Fragment } from "react";
import steeringWheel from "../../../assets/icons/steering-wheel.svg";
import classes from "./mobileMenu.module.css";

export const MobileMenu = () => {
  const buttonSize = 85;

  return (
    <Fragment>
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
        as={motion.button}
        whileTap={{ rotate: 360, transition: { duration: 0.4 } }}
      />
    </Fragment>
  );
};
