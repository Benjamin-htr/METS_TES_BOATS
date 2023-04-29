import { Flex, Link, Spinner, Text } from "@chakra-ui/react";
import { LatLng } from "leaflet";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { trpc } from "../../lib/trpc";
import { Map } from "./Map/Map";

export const NewTraject = () => {
  const boatsQuery = trpc.boat.getAll.useQuery();
  const boatPosition: LatLng = new LatLng(23, -173);
  const [destinationPosition, setDestinationPositionState] = useState<LatLng | undefined>(undefined);

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

  const availableBoats = boatsQuery.data.filter((boat) => boat.isAvailable);

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

  return (
    <Flex direction={"column"} flexGrow={1} padding={"10px"}>
      <Text>Choisissez un bateau</Text>

      <Text>
        {destinationPosition
          ? `Distance: ${(boatPosition.distanceTo(destinationPosition) / 1000).toFixed(0)} kms`
          : "Cliquez sur la carte pour définir une destination"}
      </Text>
      <Map
        boatPosition={boatPosition}
        cameraPosition={new LatLng(23, -173)}
        allowedControl={true}
        onDestinationPositionChange={(e) => {
          setDestinationPositionState(e?.latlng ?? new LatLng(0, 0));
        }}
      />
    </Flex>
  );
};
