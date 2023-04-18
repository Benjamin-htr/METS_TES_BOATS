import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/atoms/Button/Button";

const LoginSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(12).max(20),
});
type LoginSchemaType = z.infer<typeof LoginSchema>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      {errors.username && <span>{errors.username.message}</span>}
      <input {...register("password")} />
      {errors.password && <span>{errors.password.message}</span>}
      <Button>Soumettre</Button>
    </form>
  );
};
