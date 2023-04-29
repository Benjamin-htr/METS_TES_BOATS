import { useToast } from "@chakra-ui/react";
import {
  AlertDialogBasic,
  AlertDialogBasicProps,
} from "../../../../components/organisms/AlertDialogBasic/AlertDialogBasic";
import { trpc } from "../../../../lib/trpc";

interface BoatDeleteAlertProps extends AlertDialogBasicProps {
  boatId: number;
}

export const BoatDeleteAlert = (props: BoatDeleteAlertProps) => {
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
    <AlertDialogBasic
      {...props}
      heading="Suppression du bateau ?"
      body="Êtes-vous sûr de vouloir supprimer ce bateau ? Ce supprimera aussi tous les trajets qui lui sont associés."
      confirmFunction={() => deleteBoatMutation.mutate({ boatId: props.boatId })}
      isLoading={deleteBoatMutation.isLoading}
    />
  );
};
