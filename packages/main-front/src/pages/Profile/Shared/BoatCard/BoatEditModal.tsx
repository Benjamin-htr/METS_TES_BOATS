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
  Stack,
  VisuallyHidden,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBoatSchema } from "@pnpm-monorepo/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RouterOutput, trpc } from "../../../../lib/trpc";
import { GetElementType } from "../../../../utils/utilityType";

type editBoatSchemaType = z.infer<typeof editBoatSchema>;

interface BoatEditModalProps extends Omit<ModalProps, "children"> {
  boat: GetElementType<RouterOutput["boat"]["getAll"]>;
}

export const BoatEditModal = (props: BoatEditModalProps) => {
  const toast = useToast();
  const utilsTrpc = trpc.useContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editBoatSchemaType>({ resolver: zodResolver(editBoatSchema), defaultValues: { name: props.boat.name } });

  const editBoatMutation = trpc.boat.edit.useMutation({
    onSuccess: async () => {
      toast({
        title: "Bateau modifié",
        description: "Le bateau a bien été modifié",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      props.onClose();
      await utilsTrpc.boat.getAll.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Erreur lors de la modification du bateau",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: editBoatSchemaType) => {
    console.log(data);
    editBoatMutation.mutate(data);
  };

  return (
    <Modal {...props} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bateau modifié : {props.boat.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="edit-boat-form" onSubmit={handleSubmit(onSubmit)}>
            <VisuallyHidden>
              <input
                {...register("boatId", {
                  valueAsNumber: true,
                })}
                value={props.boat.id}
              />
            </VisuallyHidden>
            <Stack spacing={"15px"}>
              <FormControl isInvalid={errors.name ? true : false} isRequired>
                <FormLabel htmlFor="name">Nom du bateau</FormLabel>
                <Input id="name" placeholder="nom du bateau" {...register("name")} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={props.onClose}>
            Annuler
          </Button>
          <Button colorScheme="blue" ml={3} type="submit" form="edit-boat-form" isLoading={editBoatMutation.isLoading}>
            Confirmer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
