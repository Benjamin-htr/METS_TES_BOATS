import { Flex, Link, Spinner, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { trpc } from "../../lib/trpc";
import { NewTrajectForm } from "./NewTrajectForm";

export const NewTraject = () => {
  const boatsQuery = trpc.boat.getAll.useQuery();

  if (boatsQuery.isLoading) {
    return (
      <Flex justify={"center"} align={"center"} flexGrow={1}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (boatsQuery.isError) {
    return <Text>Erreur lors du chargement des bateaux</Text>;
  }

  const availableBoats = boatsQuery.data.filter(
    (boat) => boat.Traject.find((t) => t.finishedDate === null) === undefined
  );

  if (availableBoats.length === 0) {
    return (
      <Flex>
        <Text>
          Aucun bateau disponible, vous pouvez en ajouter un sur la page{" "}
          <Link as={RouterLink} to={"/profile"} color={"blue.500"}>
            profile
          </Link>{" "}
          ou attendre qu'un bateau soit disponible en finissant ou en annulant un trajet en cours sur la page{" "}
          <Link as={RouterLink} to={"/history"} color={"blue.500"}>
            historique
          </Link>
          .
        </Text>
      </Flex>
    );
  }

  return <NewTrajectForm boats={availableBoats} />;
};
