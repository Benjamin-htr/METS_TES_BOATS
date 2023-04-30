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
} from "@chakra-ui/react";
import { RouterOutput, trpc } from "../../../lib/trpc";
import { GetElementType } from "../../../utils/utilityType";
import { EditForm } from "./EditForm";

interface TrajectCardProps {
  traject: GetElementType<RouterOutput["traject"]["getAll"]>;
}

export const TrajectCard = (props: TrajectCardProps) => {
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
          <Button variant="solid" colorScheme="blue">
            Modifier
          </Button>
          <Button variant="outline" colorScheme="red">
            Supprimer
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
