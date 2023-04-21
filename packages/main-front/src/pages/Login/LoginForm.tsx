import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema } from "@pnpm-monorepo/schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "../../lib/trpc";

type LoginSchemaType = z.infer<typeof loginUserSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginUserSchema) });

  const loginMutation = trpc.auth.loginUser.useMutation();

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="md">
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
        <Button mt={4} colorScheme="teal" type="submit" alignSelf={"flex-end"} isLoading={loginMutation.isLoading}>
          Se connecter
        </Button>
      </Flex>
    </form>
  );
};
