import { Avatar, Box, Button, Divider, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { CgLogOut } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { trpc } from "../../../lib/trpc";
import { DeleteAccountAlert } from "../DeleteAccountAlert";

export const MobileProfile = () => {
  const navigate = useNavigate();
  const meQuery = trpc.user.getMe.useQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const logoutMutation = trpc.auth.logoutUser.useMutation({
    onSuccess: () => {
      navigate("/login");
    },
  });

  return (
    <Box h={"100vh"}>
      <Box h={"25%"} minH={"175px"} w={"100%"} pos={"relative"}>
        <Heading textAlign={"center"} position={"absolute"} zIndex={1} w={"100%"} top={"15px"}>
          {meQuery.data?.data.user?.username}
        </Heading>
        <Box height={"100%"} clipPath={"ellipse(60% 100% at 50% 0%)"} bg={"rgb(180, 195, 220)"} zIndex={0} />
        <Avatar
          position={"absolute"}
          bottom={"-20px"}
          left={"50%"}
          transform={"translateX(-50%)"}
          zIndex={1}
          size={"2xl"}
          bg="#AF5D63"
        />
      </Box>
      <Flex direction="column" mt={"40px"} align={"center"} padding={"0px 20px"} gap={"25px"}>
        <Button
          colorScheme="orange"
          w={"80%"}
          leftIcon={<CgLogOut />}
          onClick={() => logoutMutation.mutate()}
          isLoading={logoutMutation.isLoading}
        >
          Déconnexion
        </Button>
        <Divider orientation="horizontal" colorScheme={"gray"} border={"white solid 1px"} />
        <Button colorScheme="red" w={"80%"} leftIcon={<MdDelete />} onClick={onOpen}>
          Supprimer mon compte
        </Button>
        <Divider orientation="horizontal" colorScheme={"gray"} border={"white solid 1px"} />
      </Flex>
      <DeleteAccountAlert isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef} />
    </Box>
  );
};
