import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Flex,
  Heading,
  Spinner,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useRef } from "react";
import { CgLogOut } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { trpc } from "../../../lib/trpc";
import { DeleteAccountAlert } from "../DeleteAccountAlert";

export const ProfileCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const meQuery = trpc.user.getMe.useQuery();

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      navigate("/login");
    },
  });

  return (
    <>
      <Card {...props} ref={ref}>
        <CardHeader>
          <Heading size="md">Profil</Heading>
          <Flex justify={"space-between"} mt={"15px"} gap={"15px"} wrap={"wrap"}>
            <Avatar size={"2xl"} />
            <Flex direction="column" justifyContent={"space-around"}>
              <Button
                colorScheme="orange"
                leftIcon={<CgLogOut />}
                onClick={() => logoutMutation.mutate()}
                isLoading={logoutMutation.isLoading}
              >
                Déconnexion
              </Button>
              <Button colorScheme="red" leftIcon={<MdDelete />} onClick={onOpen}>
                Supprimer mon compte
              </Button>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          {meQuery.isLoading ? (
            <Flex justify={"center"}>
              <Spinner size="xl" />
            </Flex>
          ) : (
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="sm" textTransform="uppercase">
                  Informations générales
                </Heading>
                <Flex gap={"10px"} mt={"8px"}>
                  <Text fontWeight="500">Nom d'utilisateur : </Text>
                  <Text>{meQuery.data?.data.user?.username}</Text>
                </Flex>
                {meQuery.data?.data.user?.createdAt && (
                  <Flex gap={"10px"} mt={"8px"}>
                    <Text fontWeight="500">Date de création : </Text>
                    <Text>{new Date(meQuery.data?.data.user?.createdAt).toLocaleDateString("fr-FR")}</Text>
                  </Flex>
                )}
              </Box>
            </Stack>
          )}
        </CardBody>
      </Card>
      <DeleteAccountAlert isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef} />
    </>
  );
});
