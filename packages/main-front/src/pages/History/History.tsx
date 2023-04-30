import { Box, Spinner } from "@chakra-ui/react";
import { trpc } from "../../lib/trpc";
import { TrajectCard } from "./TrajectCard";

export const History = () => {
  const trajectQuery = trpc.traject.getAll.useQuery();

  if (trajectQuery.isLoading) {
    return (
      <Box>
        <Spinner size={"xl"} />
      </Box>
    );
  }

  if (trajectQuery.isError) {
    return <Box>Erreur</Box>;
  }

  return (
    <Box>
      {trajectQuery.data.map((traject) => (
        <TrajectCard key={traject.id} traject={traject} />
      ))}
    </Box>
  );
};
