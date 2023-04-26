import { Button, Flex, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Fragment, useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import steeringWheel from "../../../../assets/icons/steering-wheel.svg";
import { trpc } from "../../../../lib/trpc";
import { MenuNav } from "./MenuNav";

interface MobileMenuProps {
  closeOnClick?: boolean;
}

export const MobileMenu = (props: MobileMenuProps) => {
  const buttonSize = 85;
  const backgroundSize = buttonSize - 10;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logoutMutation = trpc.auth.logoutUser.useMutation({
    onSuccess: () => {
      navigate("/login");
    },
  });

  const variants = {
    open: { width: "100%", height: "100%", opacity: 1, transition: { duration: 0.4 } },
    closed: {
      width: `${backgroundSize}px`,
      height: `${backgroundSize}px`,
      borderRadius: "50% 5% 0 5%",
      transition: { duration: 0.4 },
    },
  };

  const buttonAnim = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -200 },
      },
    },
    closed: {
      x: 300,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
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
        <Button
          pos={"absolute"}
          top={"10px"}
          right={"10px"}
          as={motion.button}
          variants={buttonAnim}
          colorScheme="orange"
          leftIcon={<CgLogOut />}
          onClick={() => logoutMutation.mutate()}
          isLoading={logoutMutation.isLoading}
        >
          Déconnexion
        </Button>
        <MenuNav isOpen={isOpen} closeMenu={closeMenu} />
      </Flex>

      <IconButton
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
