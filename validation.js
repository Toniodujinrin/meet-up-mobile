import { object, string } from "yup";

export const signUpSchema = object({
  email: string().required().label("Email"),
  password: string().required().label("Password"),
});
