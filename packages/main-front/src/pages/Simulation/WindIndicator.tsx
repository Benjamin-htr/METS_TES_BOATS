import { Flex, Icon, Text } from "@chakra-ui/react";
import { GiWindsock } from "react-icons/gi";
import { Indicator } from "./Indicator";

interface WindIndicatorProps {
  windDirection: number;
  windSpeed: number;
}

export const WindIndicator = (props: WindIndicatorProps) => {
  return (
    <Indicator>
      <Flex direction={"column"} align={"center"}>
        <Icon as={GiWindsock} boxSize={5} />
        <Text fontSize={"xs"} lineHeight={"1em"} fontWeight={500}>
          {props.windDirection} °
        </Text>
        <Text fontSize={"xs"} lineHeight={"1em"} fontWeight={500}>
          {props.windSpeed} n.
        </Text>
      </Flex>
    </Indicator>
  );
};
