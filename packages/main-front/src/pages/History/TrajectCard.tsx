import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Spinner, Text } from "@chakra-ui/react";
import { RouterOutput, trpc } from "../../lib/trpc";
import { GetElementType } from "../../utils/utilityType";

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
      <CardBody>
        <Text>{props.traject.name}</Text>
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
