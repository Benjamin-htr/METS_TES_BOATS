import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema } from "@pnpm-monorepo/schemas";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { PasswordInput } from "../../components/atoms/PasswordInput/PasswordInput";
import { trpc } from "../../lib/trpc";

type LoginSchemaType = z.infer<typeof loginUserSchema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginUserSchema) });

  const loginMutation = trpc.auth.loginUser.useMutation({
    onSuccess: (data) => {
      navigate("/new_traject");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

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
          <PasswordInput id="password" placeholder="mot de passe" {...register("password")} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        {error && <Text color={"red"}>{error}</Text>}
        <Button mt={4} colorScheme="teal" type="submit" alignSelf={"flex-end"} isLoading={loginMutation.isLoading}>
          Se connecter
        </Button>
      </Flex>
    </form>
  );
};
