import { object, string } from "yup";

export const signUpSchema = object({
  email: string().required().label("Email"),
  password: string().required().label("Password"),
});

export const verifyAccountSchema = object({
  firstName: string().required().label("First Name"),
  lastName: string().required().label("Last Name"),
  phone: string().required().label("Phone Number"),
  bio: string().required().label("Bio"),
  username: string().required().label("Username"),
});

export const verifyEmailSchema = object({
  otp: string().required().label("OTP"),
});
