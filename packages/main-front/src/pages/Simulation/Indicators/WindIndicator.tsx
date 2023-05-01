import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  VisuallyHiddenInput,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeTrajectWind } from "@pnpm-monorepo/schemas";
import { Controller, useForm } from "react-hook-form";
import { GiWindsock } from "react-icons/gi";
import { z } from "zod";
import { SliderBasic } from "../../../components/atoms/Slider/Slider";
import { RouterOutput, trpc } from "../../../lib/trpc";
import { Indicator } from "./Indicator";

type changeTrajectWindSchemaType = z.infer<typeof changeTrajectWind>;

interface WindIndicatorProps {
  traject: RouterOutput["traject"]["get"];
}

export const WindIndicator = (props: WindIndicatorProps) => {
  const toast = useToast();
  const utilsTrpc = trpc.useContext();

  if (!props.traject) {
    throw new Error("No traject provided");
  }

  const changeWindMutation = trpc.traject.changeWind.useMutation({
    onSuccess: async () => {
      toast({
        title: "Vent changé",
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

  const currentWind = props.traject.Wind.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }).at(0);

  const defaultWindSpeed = currentWind?.speed ?? 0;
  const defaultDirection = currentWind?.direction ?? 0;

  const { register, handleSubmit, control } = useForm<changeTrajectWindSchemaType>({
    resolver: zodResolver(changeTrajectWind),
    defaultValues: {
      trajectId: props.traject.id,
      speed: defaultWindSpeed,
      direction: defaultDirection,
    },
  });

  const onSubmit = (data: changeTrajectWindSchemaType) => {
    console.log(data);
    changeWindMutation.mutate(data);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Indicator>
          <Flex direction={"column"} align={"center"}>
            <Icon as={GiWindsock} boxSize={5} />
            <Text fontSize={"xs"} lineHeight={"1em"} fontWeight={500}>
              {currentWind?.direction ?? 0} °
            </Text>
            <Text fontSize={"xs"} lineHeight={"1em"} fontWeight={500}>
              {currentWind?.speed ?? 0} n.
            </Text>
          </Flex>
        </Indicator>
      </PopoverTrigger>
      <PopoverContent color="black">
        <PopoverHeader fontWeight={"bold"}>Vent</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <form onSubmit={handleSubmit(onSubmit)} id="wind-form">
            <Stack gap={"40px"}>
              <VisuallyHiddenInput {...register("trajectId")} />
              <FormControl id="direction">
                <FormLabel>Direction (en ° par rapport au nord)</FormLabel>
                <Controller
                  name="direction"
                  control={control}
                  defaultValue={defaultDirection}
                  render={({ field }) => <SliderBasic {...field} aria-label="change direction" max={360} />}
                />
              </FormControl>
              <FormControl id="speed">
                <FormLabel>Vitesse (en noeuds)</FormLabel>
                <Controller
                  name="speed"
                  control={control}
                  defaultValue={defaultWindSpeed}
                  render={({ field }) => <SliderBasic {...field} aria-label="change speed" max={220} mb={"20px"} />}
                />
              </FormControl>
            </Stack>
          </form>
        </PopoverBody>
        <PopoverFooter border="0" display="flex" alignItems="center" justifyContent="flex-end" pb={4}>
          <Button type="submit" form="wind-form" colorScheme="blue" isLoading={changeWindMutation.isLoading}>
            Valider
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
