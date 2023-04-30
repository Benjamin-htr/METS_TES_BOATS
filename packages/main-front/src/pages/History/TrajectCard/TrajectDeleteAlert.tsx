import { useToast } from "@chakra-ui/react";
import {
  AlertDialogBasic,
  AlertDialogBasicProps,
} from "../../../components/organisms/AlertDialogBasic/AlertDialogBasic";
import { trpc } from "../../../lib/trpc";

interface TrajectDeleteAlertProps extends AlertDialogBasicProps {
  trajectId: number;
}

export const TrajectDeleteAlert = (props: TrajectDeleteAlertProps) => {
  const toast = useToast();
  const utilsTrpc = trpc.useContext();

  const deleteTrajectMutation = trpc.traject.delete.useMutation({
    onSuccess: async () => {
      toast({
        title: "Trajet supprimé",
        description: "Le trajet a bien été supprimé",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      props.onClose();
      await utilsTrpc.traject.getAll.invalidate();
      await utilsTrpc.boat.getAll.invalidate();
    },
  });

  return (
    <AlertDialogBasic
      {...props}
      heading="Suppression du trajet ?"
      body="Êtes-vous sûr de vouloir supprimer ce trajet ?"
      confirmFunction={() => deleteTrajectMutation.mutate({ trajectId: props.trajectId })}
      isLoading={deleteTrajectMutation.isLoading}
    />
  );
};
