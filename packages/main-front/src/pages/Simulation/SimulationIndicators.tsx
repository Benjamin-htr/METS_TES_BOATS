import { Flex } from "@chakra-ui/react";
import { RouterOutput } from "../../lib/trpc";
import { SpeedIndicator } from "./Indicators/SpeedIndicator";
import { WindIndicator } from "./Indicators/WindIndicator";

interface SimulationIndicatorsProps {
  traject: RouterOutput["traject"]["get"];
}

export const SimulationIndicators = (props: SimulationIndicatorsProps) => {
  if (!props.traject) {
    throw new Error("No traject provided");
  }

  return (
    <Flex justify={"space-between"}>
      <WindIndicator traject={props.traject} />
      <SpeedIndicator traject={props.traject} />
    </Flex>
  );
};
