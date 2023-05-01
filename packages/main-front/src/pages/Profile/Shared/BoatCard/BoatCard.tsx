import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { RouterOutput } from "../../../../lib/trpc";
import { GetElementType } from "../../../../utils/utilityType";
import { BoatDeleteAlert } from "./BoatDeleteAlert";
import { BoatEditModal } from "./BoatEditModal";

interface BoatCardProps {
  boat: GetElementType<RouterOutput["boat"]["getAll"]>;
}

export const BoatCard = (props: BoatCardProps) => {
  const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure();
  const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure();

  const cancelRef = useRef(null);

  return (
    <>
      <Card>
        <CardBody>
          <Image
            src="https://images.unsplash.com/photo-1527431293370-0cd188ca5d15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80"
            alt="Boat at port in the morning"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{props.boat.name}</Heading>
            <Text>
              <Text fontWeight={500} as="b">
                Modèle :{" "}
              </Text>
              {props.boat.BoatModel.name}
            </Text>
            <Text>
              <Text fontWeight={500} as={"b"}>
                Description :{" "}
              </Text>
              {props.boat.BoatModel.description}
            </Text>
            <Text>
              <Text fontWeight={500} as={"b"}>
                Carburant max :{" "}
              </Text>
              {props.boat.BoatModel.maxFuel} L
            </Text>
            <Text>
              <Text fontWeight={500} as={"b"}>
                Vitesse max :{" "}
              </Text>
              {props.boat.BoatModel.maxSpeed} noeuds
            </Text>
            <Text>
              <Text fontWeight={500} as={"b"}>
                En service depuis le :{" "}
              </Text>
              {new Date(props.boat.createdAt).toLocaleDateString("fr-FR")}
            </Text>
            <Flex justifyContent={"space-between"}>
              <Text color="blue.600" fontSize="2xl">
                0 kms
              </Text>
              <Text color="blue.600" fontSize="2xl">
                {props.boat.isAvailable ? "À quai" : "En mer"}
              </Text>
            </Flex>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={editOnOpen}>
              Modifier
            </Button>
            <Button variant="outline" colorScheme="red" onClick={deleteOnOpen}>
              Supprimer
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <BoatDeleteAlert
        isOpen={deleteIsOpen}
        onClose={deleteOnClose}
        leastDestructiveRef={cancelRef}
        boatId={props.boat.id}
      />
      <BoatEditModal isOpen={editIsOpen} onClose={editOnClose} boat={props.boat} />
    </>
  );
};