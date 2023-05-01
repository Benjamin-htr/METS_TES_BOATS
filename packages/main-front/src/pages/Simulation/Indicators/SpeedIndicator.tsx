import {
  Box,
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
  Text,
  VisuallyHiddenInput,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeTrajectSpeed } from "@pnpm-monorepo/schemas";
import { Controller, useForm } from "react-hook-form";
import { BsSpeedometer } from "react-icons/bs";
import { z } from "zod";
import { SliderBasic } from "../../../components/atoms/Slider/Slider";
import { RouterOutput, trpc } from "../../../lib/trpc";
import { Indicator } from "./Indicator";

type changeTrajectSpeedSchemaType = z.infer<typeof changeTrajectSpeed>;

interface SpeedIndicatorProps {
  traject: RouterOutput["traject"]["get"];
}

export const SpeedIndicator = (props: SpeedIndicatorProps) => {
  const toast = useToast();
  const utilsTrpc = trpc.useContext();

  if (!props.traject) {
    throw new Error("No traject provided");
  }

  const changeSpeedMutation = trpc.traject.changeSpeed.useMutation({
    onSuccess: async () => {
      toast({
        title: "Vitesse changée",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      await utilsTrpc.traject.get.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const currentSpeed = props.traject.Speed.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }).at(0);

  const defaultSpeed = currentSpeed?.speed ?? 0;

  const { register, handleSubmit, control } = useForm<changeTrajectSpeedSchemaType>({
    resolver: zodResolver(changeTrajectSpeed),
    defaultValues: {
      trajectId: props.traject.id,
      speed: defaultSpeed,
    },
  });

  const onSubmit = (data: changeTrajectSpeedSchemaType) => {
    console.log(data);
    changeSpeedMutation.mutate(data);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Indicator>
          <Flex direction={"column"} align={"center"}>
            <Icon as={BsSpeedometer} boxSize={5} />
            <Text fontSize={"xs"} lineHeight={"1em"} fontWeight={500}>
              {currentSpeed?.speed ?? 0} noeuds
            </Text>
          </Flex>
        </Indicator>
      </PopoverTrigger>
      <PopoverContent color="black">
        <PopoverHeader fontWeight={"bold"}>Vitesse (en noeuds)</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Box as="form" onSubmit={handleSubmit(onSubmit)} id="speed-form" padding={"20px 0px"}>
            <VisuallyHiddenInput {...register("trajectId")} />
            <Controller
              name="speed"
              control={control}
              defaultValue={defaultSpeed}
              render={({ field }) => (
                <SliderBasic {...field} aria-label="change speed" max={props.traject?.Boat.BoatModel.maxSpeed} />
              )}
            />
          </Box>
        </PopoverBody>
        <PopoverFooter border="0" display="flex" alignItems="center" justifyContent="flex-end" pb={4}>
          <Button type="submit" form="speed-form" colorScheme="blue" isLoading={changeSpeedMutation.isLoading}>
            Valider
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
