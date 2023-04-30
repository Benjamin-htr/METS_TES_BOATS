import { Box, Flex, Heading } from "@chakra-ui/react";
import { LatLng } from "leaflet";
import { useParams } from "react-router-dom";
import { Map } from "../../components/molecules/Map/Map";
import { trpc } from "../../lib/trpc";
import { SimulationIndicators } from "./SimulationIndicators";

export const Simulation = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("No id provided");
  }

  const trajectQuery = trpc.traject.get.useQuery({
    trajectId: parseInt(id),
  });

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
      </Flex>
      <SimulationIndicators traject={trajectQuery.data} />
      <Map
        boatPosition={new LatLng(trajectQuery.data.Boat.latitude, trajectQuery.data.Boat.longitude)}
        cameraPosition={new LatLng(trajectQuery.data.Boat.latitude, trajectQuery.data.Boat.longitude)}
        allowedControl={false}
        destinationPosition={new LatLng(trajectQuery.data.latitude, trajectQuery.data.longitude)}
      />
    </Flex>
  );
};
