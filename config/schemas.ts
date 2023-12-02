import { z } from 'zod';

export const userLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email.' })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, { message: 'Password field must have at least 8 characters.' })
    .trim()
});

export const userSignupSchema = z
  .object({
    first_name: z
      .string()
      .min(2, { message: 'First name must have a minimun of 2 characters.' })
      .max(32, { message: 'First name must have less than 32 characters.' })
      .trim(),
    last_name: z
      .string()
      .min(2, { message: 'Last name must have a minimun of 2 characters.' })
      .max(32, { message: 'Last name must have less than 32 characters.' })
      .trim(),
    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Please enter a valid email.' })
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .trim()
      .min(8, { message: 'Your password must have at least 8 characters.' })
      .max(20, { message: 'Your password must have less than 20 characters.' }),
    confirm_password: z
      .string()
      .trim()
      .min(8, { message: 'Your password must have at least 8 characters.' })
      .max(20, { message: 'Your password must have less than 20 characters.' })
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password']
  });

export type UserLoginType = z.infer<typeof userLoginSchema>;
export type UserSignupType = z.infer<typeof userSignupSchema>;
