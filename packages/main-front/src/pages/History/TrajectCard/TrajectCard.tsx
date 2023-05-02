import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Link,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { RouterOutput, trpc } from "../../../lib/trpc";
import { GetElementType } from "../../../utils/utilityType";
import { EditForm } from "./EditForm";
import { TrajectDeleteAlert } from "./TrajectDeleteAlert";

interface TrajectCardProps {
  traject: GetElementType<RouterOutput["traject"]["getAll"]>;
}

export const TrajectCard = (props: TrajectCardProps) => {
  const navigate = useNavigate();
  const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure();
  const cancelRef = useRef(null);

  const boatQuery = trpc.boat.get.useQuery({
    boatId: props.traject.Boat.id,
  });

  if (boatQuery.isLoading) {
    return (
      <Card>
        <CardBody>
          <Spinner size={"xl"} />
        </CardBody>
      </Card>
    );
  }

  if (boatQuery.isError) {
    return (
      <Card>
        <CardBody>Erreur</CardBody>
      </Card>
    );
  }

  let AverageSpeed = 0;
  props.traject.Speed.forEach((speed) => {
    AverageSpeed += speed.speed;
  });
  AverageSpeed = AverageSpeed / props.traject.Speed.length;

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">
            <EditForm traject={props.traject} />
          </Heading>
        </CardHeader>
        <CardBody>
          {props.traject.createdAt && (
            <Text>
              <Text fontWeight={500} as={"b"}>
                Date de création :{" "}
              </Text>
              {new Date(props.traject.createdAt).toLocaleDateString("fr-FR") +
                " à " +
                new Date(props.traject.createdAt).toLocaleTimeString("fr-FR")}
            </Text>
          )}
          <Text>
            <Text fontWeight={500} as={"b"}>
              Bateau :{" "}
            </Text>
            {props.traject.Boat.name}
            <Link as={RouterLink} to={`/profile`} color={"blueviolet"} marginLeft={"5px"}>
              (voir le bateau)
            </Link>
          </Text>
          <Text>
            <Text fontWeight={500} as={"b"}>
              Distance :{" "}
            </Text>
            {Math.round(props.traject.kilometers as number)} kms
          </Text>
          <Text>
            <Text fontWeight={500} as={"b"}>
              Vitesse moyenne :{" "}
            </Text>
            {AverageSpeed} km/h
          </Text>
        </CardBody>
        <Divider />
        <CardFooter>
          <Flex justify={"space-between"} w={"100%"} align={"center"}>
            <ButtonGroup spacing="2">
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() => navigate(`/simulation/${props.traject.id}`)}
                isDisabled={props.traject.finishedDate !== null}
              >
                Reprendre
              </Button>
              <Button variant="outline" colorScheme="red" onClick={deleteOnOpen}>
                Supprimer
              </Button>
            </ButtonGroup>
            <Text fontWeight={500} as={"b"}>
              {props.traject.finishedDate ? "Terminé" : "En cours"}
            </Text>
          </Flex>
        </CardFooter>
      </Card>
      <TrajectDeleteAlert
        trajectId={props.traject.id}
        isOpen={deleteIsOpen}
        onClose={deleteOnClose}
        leastDestructiveRef={cancelRef}
      />
    </>
  );
};
