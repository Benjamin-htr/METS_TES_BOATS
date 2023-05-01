import { Editable, EditableInput, EditablePreview, Input, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTrajectSchema } from "@pnpm-monorepo/schemas";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { EditableControls } from "../../../components/molecules/EditableControls/EditableControls";
import { RouterOutput, trpc } from "../../../lib/trpc";
import { GetElementType } from "../../../utils/utilityType";

type editTrajectSchemaType = z.infer<typeof editTrajectSchema>;

interface EditFormProps {
  traject: GetElementType<RouterOutput["traject"]["getAll"]>;
}

export const EditForm = (props: EditFormProps) => {
  const toast = useToast();
  const utilsTrpc = trpc.useContext();

  const { setValue, control } = useForm<editTrajectSchemaType>({
    resolver: zodResolver(editTrajectSchema),
    defaultValues: { name: props.traject.name },
  });

  const editTrajectMutation = trpc.traject.edit.useMutation({
    onSuccess: async () => {
      toast({
        title: "Trajet modifié",
        description: "Le trajet a bien été modifié",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      await utilsTrpc.traject.getAll.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Erreur lors de la modification du trajet",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: editTrajectSchemaType) => {
    console.log(data);
    editTrajectMutation.mutate(data);
  };

  return (
    <Controller
      name="name"
      control={control}
      render={({ field }) => (
        <Editable
          value={field.value}
          textAlign="center"
          submitOnBlur={false}
          isPreviewFocusable={false}
          display="flex"
          alignItems="center"
          gap="5px"
          onCancel={() => setValue("name", props.traject.name)}
          onSubmit={(value) => {
            onSubmit({ name: value, trajectId: props.traject.id });
          }}
        >
          <EditablePreview />
          {/* Here is the custom input */}
          <Input as={EditableInput} {...field} />
          <EditableControls />
        </Editable>
      )}
    />
  );
};
