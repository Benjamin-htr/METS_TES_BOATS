import { Box, Flex, Spinner, Stack, useMediaQuery } from "@chakra-ui/react";
import { trpc } from "../../lib/trpc";
import { TrajectCard } from "./TrajectCard/TrajectCard";

export const History = () => {
  const trajectQuery = trpc.traject.getAll.useQuery();
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  if (trajectQuery.isLoading) {
    return (
      <Flex flexGrow={1} justify={"center"} align="center">
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (trajectQuery.isError) {
    return <Box>Erreur</Box>;
  }

  return (
    <Stack padding={isLargerThan600 ? "25px" : "10px"}>
      {trajectQuery.data.map((traject) => (
        <TrajectCard key={traject.id} traject={traject} />
      ))}
    </Stack>
  );
};
