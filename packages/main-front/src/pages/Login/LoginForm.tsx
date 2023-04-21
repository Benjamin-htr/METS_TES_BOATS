import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { style } from "@macaron-css/core";
import { loginUserSchema } from "@pnpm-monorepo/schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginFormStyle = style({});

type LoginSchemaType = z.infer<typeof loginUserSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginUserSchema) });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={loginFormStyle}>
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
        <Button>Se connecter</Button>
      </Flex>
    </form>
  );
};
