import {
  Button,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeBoatSpeed } from "@pnpm-monorepo/schemas";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsSpeedometer } from "react-icons/bs";
import { z } from "zod";
import { RouterOutput } from "../../lib/trpc";
import { Indicator } from "./Indicator";

type changeBoatSpeedSchemaType = z.infer<typeof changeBoatSpeed>;

interface SpeedIndicatorProps {
  traject: RouterOutput["traject"]["get"];
}

export const SpeedIndicator = (props: SpeedIndicatorProps) => {
  if (!props.traject) {
    throw new Error("No traject provided");
  }

  const currentSpeed = props.traject.Boat.Speed.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  })[0];

  const defaultSpeed = currentSpeed?.speed ?? 0;

  const [sliderValue, setSliderValue] = useState(defaultSpeed);

  const { register, handleSubmit, control } = useForm<changeBoatSpeedSchemaType>({
    resolver: zodResolver(changeBoatSpeed),
    defaultValues: {
      boatId: props.traject.Boat.id,
      speed: defaultSpeed,
    },
  });

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  const onSubmit = (data: changeBoatSpeedSchemaType) => {
    console.log(data);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Indicator>
          <Flex direction={"column"} align={"center"}>
            <Icon as={BsSpeedometer} boxSize={5} />
            <Text fontSize={"xs"} lineHeight={"1em"} fontWeight={500}>
              {currentSpeed?.speed || 0} noeuds
            </Text>
          </Flex>
        </Indicator>
      </PopoverTrigger>
      <PopoverContent color="black">
        <PopoverHeader fontWeight={"bold"}>Vitesse</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody padding={"30px"}>
          <form onSubmit={handleSubmit(onSubmit)} id="speed-form">
            <VisuallyHiddenInput {...register("boatId")} />
            <Controller
              name="speed"
              control={control}
              defaultValue={defaultSpeed}
              render={({ field }) => (
                <Slider {...field} aria-label="change speed" max={props.traject?.Boat.BoatModel.maxSpeed}>
                  <SliderMark value={0} {...labelStyles}>
                    0 noeuds
                  </SliderMark>
                  <SliderMark value={props.traject?.Boat.BoatModel.maxSpeed ?? 0} {...labelStyles}>
                    {props.traject?.Boat.BoatModel.maxSpeed}
                  </SliderMark>

                  <SliderMark
                    value={field.value}
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-10"
                    ml="-5"
                    w="12"
                  >
                    {field.value}
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              )}
            />
          </form>
        </PopoverBody>
        <PopoverFooter border="0" display="flex" alignItems="center" justifyContent="flex-end" pb={4}>
          <Button type="submit" form="speed-form" colorScheme="blue">
            Valider
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
