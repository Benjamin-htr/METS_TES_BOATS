import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { trpc } from "../../lib/trpc";

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
    <Box>
      <Heading>Simulation</Heading>
      <Text>{trajectQuery.data.name}</Text>
    </Box>
  );
};
