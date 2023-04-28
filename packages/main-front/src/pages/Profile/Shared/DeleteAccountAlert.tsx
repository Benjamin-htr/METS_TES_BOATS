import { useNavigate } from "react-router-dom";
import {
  AlertDialogBasic,
  AlertDialogBasicProps,
} from "../../../components/organisms/AlertDialogBasic/AlertDialogBasic";
import { trpc } from "../../../lib/trpc";

export const DeleteAccountAlert = (props: AlertDialogBasicProps) => {
  const navigate = useNavigate();
  const deleteAccountMutation = trpc.auth.delete.useMutation({
    onSuccess: () => {
      navigate("/signup");
    },
  });

  return (
    <AlertDialogBasic
      {...props}
      heading="Suppression du compte ?"
      body="Êtes-vous sûr de vouloir supprimer votre compte ?"
      confirmFunction={() => deleteAccountMutation.mutate()}
      isLoading={deleteAccountMutation.isLoading}
    />
  );
};
