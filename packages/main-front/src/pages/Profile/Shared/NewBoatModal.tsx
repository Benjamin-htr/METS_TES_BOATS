import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBoatSchema } from "@pnpm-monorepo/schemas";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "../../../lib/trpc";

type createBoatSchemaType = z.infer<typeof createBoatSchema>;

export const NewBoatModal = (props: Omit<ModalProps, "children">) => {
  const toast = useToast();
  const utilsTrpc = trpc.useContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<createBoatSchemaType>({ resolver: zodResolver(createBoatSchema) });

  const modelBoatQuery = trpc.modelBoat.getAll.useQuery();
  const createBoatMutation = trpc.boat.create.useMutation({
    onSuccess: async () => {
      toast({
        title: "Bateau créé",
        description: "Le bateau a bien été créé",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      props.onClose();
      await utilsTrpc.boat.getAll.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Erreur lors de la création du bateau",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: createBoatSchemaType) => {
    createBoatMutation.mutate(data);
  };

  if (modelBoatQuery.isLoading) {
    return (
      <Modal {...props}>
        <Spinner size="xl" />
      </Modal>
    );
  }

  if (modelBoatQuery.error) {
    return (
      <Modal {...props}>
        <p>Erreur ...</p>
      </Modal>
    );
  }

  return (
    <Modal {...props} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nouveau bateau</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="new-boat-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={"15px"}>
              <FormControl isInvalid={errors.name ? true : false} isRequired>
                <FormLabel htmlFor="name">Nom du bateau</FormLabel>
                <Input id="name" placeholder="nom du bateau" {...register("name")} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="boatModelId" isInvalid={errors.boatModelId ? true : false} isRequired>
                <FormLabel>Modèle de bateau</FormLabel>
                <Controller
                  name="boatModelId"
                  control={control}
                  defaultValue="4"
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <Stack spacing={"10px"}>
                        {modelBoatQuery.data.map((modelBoat) => (
                          <Radio key={modelBoat.id} value={modelBoat.id.toString()}>
                            {modelBoat.name}
                            <Text fontSize="xs" color="gray.500">
                              Vitesse max de {modelBoat.maxSpeed} noeuds, réservoir de {modelBoat.maxFuel} L
                            </Text>
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Stack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={props.onClose}>
            Annuler
          </Button>
          <Button colorScheme="blue" ml={3} type="submit" form="new-boat-form" isLoading={createBoatMutation.isLoading}>
            Confirmer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
