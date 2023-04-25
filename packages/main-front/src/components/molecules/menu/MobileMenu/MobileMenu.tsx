import { Flex, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Fragment, useState } from "react";
import steeringWheel from "../../../../assets/icons/steering-wheel.svg";
import { MenuNav } from "./MenuNav";
import classes from "./mobileMenu.module.css";

interface MobileMenuProps {
  closeOnClick?: boolean;
}

export const MobileMenu = (props: MobileMenuProps) => {
  const buttonSize = 85;
  const backgroundSize = buttonSize - 10;
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: { width: "100%", height: "100%", opacity: 1, transition: { duration: 0.4 } },
    closed: {
      width: `${backgroundSize}px`,
      height: `${backgroundSize}px`,
      borderRadius: "50% 5% 0 5%",
      transition: { duration: 0.4 },
    },
  };

  const closeMenu = () => {
    if (props.closeOnClick) setIsOpen(false);
  };

  return (
    <Fragment>
      <Flex
        position={"fixed"}
        height={"100%"}
        width={"100%"}
        bottom={0}
        right={0}
        align={"center"}
        justify={"center"}
        zIndex={900}
        bg="rgb(180, 195, 220)"
        as={motion.div}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      >
        <MenuNav isOpen={isOpen} closeMenu={closeMenu} />
      </Flex>

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
