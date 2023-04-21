import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@pnpm-monorepo/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "../../lib/trpc";

type createUserSchemaType = z.infer<typeof createUserSchema>;

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserSchemaType>({ resolver: zodResolver(createUserSchema) });

  const toast = useToast();

  const signupMutation = trpc.auth.registerUser.useMutation({
    onSuccess: () => {
      toast({
        title: "Inscription réussie",
        description: "Vous pouvez maintenant vous connecter",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur lors de l'inscription",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        signupMutation.mutate(data);
      })}
    >
      <Flex direction={"column"} gap={"6px"}>
        <FormControl isInvalid={errors.username ? true : false} isRequired>
          <FormLabel htmlFor="username">Nom d'utilisateur</FormLabel>
          <Input id="username" placeholder="nom d'utilisateur" {...register("username")} />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password ? true : false} isRequired>
          <FormLabel htmlFor="password">Mot de passe</FormLabel>
          <Input id="password" placeholder="mot de passe" {...register("password")} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.confirmPassword ? true : false} isRequired>
          <FormLabel htmlFor="confirmPassword">Confirmation du mot de passe</FormLabel>
          <Input id="confirmPassword" placeholder="confirmation du mot de passe" {...register("confirmPassword")} />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit" alignSelf={"flex-end"} isLoading={signupMutation.isLoading}>
          S'inscrire
        </Button>
      </Flex>
    </form>
  );
};
