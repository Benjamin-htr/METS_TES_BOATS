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

export interface AlertDialogBasicProps extends Omit<AlertDialogProps, "children"> {
  confirmFunction?: () => void;
  heading?: string;
  body?: string;
  isLoading?: boolean;
}

export const AlertDialogBasic = (props: AlertDialogBasicProps) => {
  const { confirmFunction, ...rest } = props;

  return (
    <AlertDialog motionPreset="slideInBottom" isCentered {...rest}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        {props.heading && <AlertDialogHeader>{props.heading}</AlertDialogHeader>}
        <AlertDialogCloseButton />
        {props.body && <AlertDialogBody>{props.body}</AlertDialogBody>}
        <AlertDialogFooter>
          <Button onClick={props.onClose}>Non</Button>
          <Button colorScheme="red" ml={3} onClick={confirmFunction} isLoading={props.isLoading}>
            Oui
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
