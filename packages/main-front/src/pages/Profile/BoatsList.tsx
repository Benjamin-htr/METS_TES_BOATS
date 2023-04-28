import { Spinner, Stack } from "@chakra-ui/react";
import { trpc } from "../../lib/trpc";
import { BoatCard } from "./BoatCard/BoatCard";

export const BoatsList = () => {
  const boatsQuery = trpc.boat.getAll.useQuery();

  if (boatsQuery.isLoading) {
    return <Spinner size={"xl"} />;
  } else if (boatsQuery.error) {
    return <p>Erreur ...</p>;
  }

  return (
    <Stack spacing={"15px"}>
      {boatsQuery.data.map((boat) => (
        <BoatCard boat={boat} key={boat.id} />
      ))}
    </Stack>
  );
};
