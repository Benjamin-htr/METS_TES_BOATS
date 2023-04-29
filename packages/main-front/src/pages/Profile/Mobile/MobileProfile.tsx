import { Avatar, Box, Button, Divider, Flex, Heading, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { CgLogOut } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { trpc } from "../../../lib/trpc";
import { BoatsList } from "../Shared/BoatList/BoatList";
import { DeleteAccountAlert } from "../Shared/DeleteAccountAlert";
import { NewBoatModal } from "../Shared/NewBoatModal";

export const MobileProfile = () => {
  const navigate = useNavigate();
  const meQuery = trpc.user.getMe.useQuery();
  const { isOpen: rmAccountIsOpen, onOpen: rmAccountOnOpen, onClose: rmAccountOnClose } = useDisclosure();
  const { isOpen: newBoatIsOpen, onOpen: newBoatOnOpen, onClose: newBoatOnClose } = useDisclosure();

  const cancelRef = useRef(null);

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      navigate("/login");
    },
  });

  return (
    <Box>
      <Flex direction={"column"} h={"25%"} minH={"175px"} w={"100%"} pos={"relative"}>
        <Stack position={"absolute"} zIndex={1} w={"100%"} top={"6px"} spacing={0}>
          <Heading textAlign={"center"}>{meQuery.data?.data.user?.username}</Heading>
          {meQuery.data?.data.user?.createdAt && (
            <Text textAlign={"center"} fontSize={"xs"}>
              {new Date(meQuery.data.data.user.createdAt).toLocaleDateString("fr-FR")}
            </Text>
          )}
        </Stack>
        <Box
          height={"100%"}
          clipPath={"ellipse(60% 100% at 50% 0%)"}
          bg={"rgb(180, 195, 220)"}
          zIndex={0}
          flexGrow={1}
        />
        <Avatar
          position={"absolute"}
          bottom={"-20px"}
          left={"50%"}
          transform={"translateX(-50%)"}
          zIndex={1}
          size={"2xl"}
          bg="#AF5D63"
        />
      </Flex>
      <Flex direction="column" mt={"40px"} mb={"20px"} align={"center"} padding={"0px 20px"} gap={"25px"}>
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
        <Button colorScheme="red" w={"80%"} leftIcon={<MdDelete />} onClick={rmAccountOnOpen}>
          Supprimer mon compte
        </Button>
        <Divider orientation="horizontal" colorScheme={"gray"} border={"white solid 1px"} />
        <Flex justify={"space-between"} w={"100%"}>
          <Heading size={"md"}>Mes bateaux</Heading>
          <Button colorScheme="blue" leftIcon={<IoMdAdd fill="white" />} onClick={newBoatOnOpen}>
            Ajouter
          </Button>
        </Flex>
        <BoatsList />
      </Flex>
      <DeleteAccountAlert isOpen={rmAccountIsOpen} onClose={rmAccountOnClose} leastDestructiveRef={cancelRef} />
      <NewBoatModal isOpen={newBoatIsOpen} onClose={newBoatOnClose} />
    </Box>
  );
};
