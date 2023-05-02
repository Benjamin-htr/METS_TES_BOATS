import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { LatLng } from "leaflet";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Map } from "../../components/molecules/Map/Map";
import { trpc } from "../../lib/trpc";
import { SimulationIndicators } from "./SimulationIndicators";

export const Simulation = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("No id provided");
  }

  const [boatPosition, setBoatPosition] = useState<LatLng | null>(null);

  const trajectQuery = trpc.traject.get.useQuery({
    trajectId: parseInt(id),
  });

  trpc.simulation.getPositions.useSubscription(
    { trajectId: parseInt(id) },

    {
      onData(data) {
        setBoatPosition(new LatLng(data.latitude, data.longitude));
      },
    }
  );

  if (trajectQuery.isLoading) {
    return <Box>Loading...</Box>;
  }

  if (trajectQuery.isError) {
    return <Box>Error</Box>;
  }

  if (!trajectQuery.data) {
    return <Box>Traject not found</Box>;
  }

  return (
    <Flex direction={"column"} flexGrow={1}>
      <Flex justify={"center"} margin={"15px"}>
        <Heading>{trajectQuery.data.name}</Heading>
        <Text fontSize={"xl"} margin={"0 0 0 10px"}>
          {trajectQuery.data.finishedDate ? "(Terminé)" : ""}
        </Text>
      </Flex>
      <SimulationIndicators traject={trajectQuery.data} />
      <Map
        boatPosition={boatPosition ?? new LatLng(trajectQuery.data.Boat.latitude, trajectQuery.data.Boat.longitude)}
        cameraPosition={new LatLng(trajectQuery.data.Boat.latitude, trajectQuery.data.Boat.longitude)}
        allowedControl={false}
        destinationPosition={new LatLng(trajectQuery.data.latitude, trajectQuery.data.longitude)}
      />
    </Flex>
  );
};
