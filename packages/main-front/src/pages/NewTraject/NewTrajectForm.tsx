import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VisuallyHiddenInput,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTrajectSchema } from "@pnpm-monorepo/schemas";
import { LatLng } from "leaflet";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Map } from "../../components/molecules/Map/Map";
import { RouterOutput, trpc } from "../../lib/trpc";

type createTrajectSchemaType = z.infer<typeof createTrajectSchema>;

interface NewTrajectFormProps {
  boats: RouterOutput["boat"]["getAll"];
}

export const NewTrajectForm = (props: NewTrajectFormProps) => {
  const navigate = useNavigate();
  const utilsTrpc = trpc.useContext();
  const toast = useToast();
  const [destinationPosition, setDestinationPositionState] = useState<LatLng | undefined>(undefined);
  const defaultBoat = props.boats[0];
  const [boatPosition, setBoatPosition] = useState<LatLng>(new LatLng(defaultBoat.latitude, defaultBoat.longitude));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<createTrajectSchemaType>({
    resolver: zodResolver(createTrajectSchema),
  });

  const trajectMutation = trpc.traject.create.useMutation({
    onSuccess: async (data) => {
      toast({
        title: "Trajet créé",
        description: "Le trajet a bien été créé",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      await utilsTrpc.traject.getAll.invalidate();
      await utilsTrpc.boat.getAll.invalidate();
      navigate(`/simulation/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Erreur lors de la création du trajet",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: createTrajectSchemaType) => {
    trajectMutation.mutate(data);
  };

  return (
    <Flex direction={"column"} flexGrow={1}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack padding={"10px"}>
          <FormControl isInvalid={errors.name ? true : false} isRequired>
            <FormLabel htmlFor="name">Nom du trajet</FormLabel>
            <Input id="name" placeholder="nom du trajet" {...register("name")} />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl id="boatModelId" isInvalid={errors.boatId ? true : false} isRequired>
            <FormLabel>Bateau</FormLabel>
            <Controller
              name="boatId"
              control={control}
              defaultValue={defaultBoat.id.toString()}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  onChange={(e) => {
                    const boat = props.boats.find((boat) => boat.id.toString() === e);
                    if (boat) {
                      setBoatPosition(new LatLng(boat.latitude, boat.longitude));
                    }
                    field.onChange(e);
                  }}
                >
                  <Stack spacing={"10px"}>
                    {props.boats.map((boat) => (
                      <Radio key={boat.id} value={boat.id.toString()}>
                        {boat.name} - {boat.BoatModel.name}
                        <Text fontSize="xs" color="gray.500">
                          Vitesse max de {boat.BoatModel.maxSpeed} noeuds, réservoir de {boat.BoatModel.maxFuel} L
                        </Text>
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              )}
            />
          </FormControl>
          <VisuallyHiddenInput {...register("latitudeDestination")} />
          <VisuallyHiddenInput {...register("longitudeDestination")} />

          {errors.latitudeDestination || errors.longitudeDestination ? (
            <Text color={"red.500"}>Veuillez sélectionner une destination en cliquant sur la carte</Text>
          ) : null}
          <Button type="submit" colorScheme="blue" alignSelf={"end"} isLoading={trajectMutation.isLoading}>
            Démarrer
          </Button>
        </Stack>
      </form>
      <Text>
        {destinationPosition
          ? `Distance: ${(boatPosition.distanceTo(destinationPosition) / 1000).toFixed(0)} kms`
          : "Cliquez sur la carte pour définir une destination"}
      </Text>
      <Map
        boatPosition={boatPosition}
        cameraPosition={boatPosition}
        allowedControl={true}
        onDestinationPositionChange={(e) => {
          setDestinationPositionState(e?.latlng ?? new LatLng(0, 0));
          setValue("latitudeDestination", e?.latlng.lat ?? 0);
          setValue("longitudeDestination", e?.latlng.lng ?? 0);
          errors.latitudeDestination = undefined;
          errors.longitudeDestination = undefined;
        }}
      />
    </Flex>
  );
};
