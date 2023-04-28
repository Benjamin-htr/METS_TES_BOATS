import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
  useToast,
} from "@chakra-ui/react";
import { trpc } from "../../../lib/trpc";

interface BoatDeleteAlertProps extends Omit<AlertDialogProps, "children"> {
  confirmFunction?: () => void;
  boatId: number;
}

export const BoatDeleteAlert = (props: BoatDeleteAlertProps) => {
  const { confirmFunction, ...rest } = props;
  const toast = useToast();
  const utilsTrpc = trpc.useContext();

  const deleteBoatMutation = trpc.boat.delete.useMutation({
    onSuccess: async () => {
      toast({
        title: "Bateau supprimé",
        description: "Le bateau a bien été supprimé",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      props.onClose();
      await utilsTrpc.boat.getAll.invalidate();
    },
  });

  return (
    <AlertDialog motionPreset="slideInBottom" isCentered {...rest}>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Suppresion du bateau ?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Etes vous sur de vouloir supprimer ce bateau ? Cela supprimera aussi tous les trajets que vous avez effectué
          avec celui-ci
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={props.onClose}>Non</Button>
          <Button
            colorScheme="red"
            ml={3}
            onClick={() => deleteBoatMutation.mutate({ boatId: props.boatId })}
            isLoading={deleteBoatMutation.isLoading}
          >
            Oui
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
