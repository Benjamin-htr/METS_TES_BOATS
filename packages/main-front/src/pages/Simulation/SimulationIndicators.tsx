import { Flex } from "@chakra-ui/react";
import { RouterOutput } from "../../lib/trpc";
import { SpeedIndicator } from "./SpeedIndicator";
import { WindIndicator } from "./WindIndicator";

interface SimulationIndicatorsProps {
  traject: RouterOutput["traject"]["get"];
}

export const SimulationIndicators = (props: SimulationIndicatorsProps) => {
  if (!props.traject) {
    throw new Error("No traject provided");
  }

  const currentWind = props.traject.Wind.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  })[0];

  return (
    <Flex justify={"space-between"}>
      <WindIndicator windDirection={currentWind.direction} windSpeed={currentWind.speed} />
      <SpeedIndicator traject={props.traject} />
    </Flex>
  );
};
