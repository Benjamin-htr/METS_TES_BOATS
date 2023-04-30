import { ButtonGroup, Flex, IconButton, useEditableControls } from "@chakra-ui/react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

interface EditableControlsProps {
  confirmIsLoading?: boolean;
}

export const EditableControls = (props: EditableControlsProps) => {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        icon={<AiOutlineCheck />}
        {...getSubmitButtonProps()}
        aria-label="Valider les modifications"
        isLoading={props.confirmIsLoading}
        colorScheme="green"
      />
      <IconButton
        icon={<AiOutlineClose />}
        {...getCancelButtonProps()}
        aria-label="Annuler les modifications"
        colorScheme="red"
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton size="sm" icon={<FiEdit />} {...getEditButtonProps()} aria-label="Modifier" />
    </Flex>
  );
};
