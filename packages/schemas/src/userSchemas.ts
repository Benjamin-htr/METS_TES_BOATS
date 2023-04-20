import { z } from "zod";

export const createUserSchema = z
  .object({
    username: z
      .string({ required_error: "Le nom d'utilisateur est requis" })
      .min(3, { message: "Le nom d'utilisateur doit contenir au moins 3 caractères" })
      .max(20, { message: "Le nom d'utilisateur doit contenir au plus 20 caractères" }),
    password: z
      .string({ required_error: "Le mot de passe est requis" })
      .min(10, { message: "Le mot de passe doit contenir au moins 10 caractères" })
      .max(30, { message: "Le mot de passe doit contenir au plus 30 caractères" }),
    confirmPassword: z.string({ required_error: "S'il vous plaît, confirmez votre mot de passe" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
  });

export const loginUserSchema = z.object({
  username: z.string({ required_error: "Le nom d'utilisateur est requis" }),
  password: z.string({ required_error: "Le mot de passe est requis" }),
});
