import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { RouterOutput, trpc } from "../../../lib/trpc";
import { GetElementType } from "../../../utils/utilityType";
import { EditForm } from "./EditForm";
import { TrajectDeleteAlert } from "./TrajectDeleteAlert";

interface TrajectCardProps {
  traject: GetElementType<RouterOutput["traject"]["getAll"]>;
}

export const TrajectCard = (props: TrajectCardProps) => {
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

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">
            <EditForm traject={props.traject} />
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>{props.traject.Boat.name}</Text>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" as={RouterLink} to={`/simulation/${props.traject.id}`}>
              Reprendre
            </Button>
            <Button variant="outline" colorScheme="red" onClick={deleteOnOpen}>
              Supprimer
            </Button>
          </ButtonGroup>
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
