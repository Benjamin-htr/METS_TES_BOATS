import { zodResolver } from "@hookform/resolvers/zod";
import { style } from "@macaron-css/core";
import { loginUserSchema } from "@pnpm-monorepo/schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/atoms/Button/Button";
import { Flex } from "../../components/atoms/Flex/Flex";
import { Input } from "../../components/atoms/Input/Input";

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
        <Input register={register} name="username" />
        {errors.username && <span>{errors.username.message}</span>}
        <Input register={register} name="password" />
        {errors.password && <span>{errors.password.message}</span>}
        <Button>Soumettre</Button>
      </Flex>
    </form>
  );
};
