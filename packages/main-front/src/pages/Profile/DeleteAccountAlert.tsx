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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { trpc } from "../../lib/trpc";

interface DeleteAccountAlertProps extends Omit<AlertDialogProps, "children"> {
  confirmFunction?: () => void;
}

export const DeleteAccountAlert = (props: DeleteAccountAlertProps) => {
  const { confirmFunction, ...rest } = props;

  const navigate = useNavigate();
  const deleteAccountMutation = trpc.auth.delete.useMutation({
    onSuccess: () => {
      navigate("/signup");
    },
  });

  return (
    <AlertDialog motionPreset="slideInBottom" isCentered {...rest}>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Suppresion du compte ?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>Etes vous sur de vouloir supprimer votre compte ?</AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={props.onClose}>Non</Button>
          <Button
            colorScheme="red"
            ml={3}
            onClick={() => deleteAccountMutation.mutate()}
            isLoading={deleteAccountMutation.isLoading}
          >
            Oui
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
