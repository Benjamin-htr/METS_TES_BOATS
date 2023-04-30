import { Box, Flex, Link, Spinner, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
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
    return <Box padding="10px">Erreur</Box>;
  }

  if (trajectQuery.data.length === 0) {
    return (
      <Box padding="10px">
        <Text>
          Aucun trajet en cours ou terminé, vous pouvez en ajouter un sur la page{" "}
          <Link as={RouterLink} to={"/new_traject"} color={"blue.500"}>
            nouveau trajet
          </Link>{" "}
        </Text>
      </Box>
    );
  }

  return (
    <Stack padding={isLargerThan600 ? "25px" : "10px"}>
      {trajectQuery.data.map((traject) => (
        <TrajectCard key={traject.id} traject={traject} />
      ))}
    </Stack>
  );
};
