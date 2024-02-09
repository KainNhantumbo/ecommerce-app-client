'use client';

import { z } from 'zod';

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email.' })
    .trim()
    .toLowerCase()
});

export const passwordSchema = z.object({
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
});

export const orderSchema = z.object({
  customerName: z
    .string()
    .min(8, { message: 'Name must have a minimum of 8 characters.' })
    .max(21, { message: 'Name must have less than 21 characters.' })
    .trim(),
  phone: z
    .string()
    .min(9, { message: 'Phone number must have a minimum of 9 characters.' })
    .max(11, { message: 'Name must have less than 11 characters.' })
    .trim(),
  address: z
    .string()
    .min(21, { message: 'Address must have a minimum of 21 characters.' })
    .max(128, { message: 'Address must have less than 128 characters.' })
    .trim()
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must have a minimum of 2 characters.' })
    .max(21, { message: 'Name must have less than 21 characters.' })
    .trim(),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email.' })
    .trim()
    .toLowerCase(),
  subject: z
    .string()
    .min(2, { message: 'Subject must have a minimum of 2 characters.' })
    .max(21, { message: 'Subject must have less than 21 characters.' })
    .trim(),
  message: z
    .string()
    .min(12, { message: 'Message must have a minimum of 12 characters.' })
    .max(256, { message: 'Message name must have less than 256 characters.' })
    .trim()
});

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
    firstName: z
      .string()
      .min(2, { message: 'First name must have a minimum of 2 characters.' })
      .max(21, { message: 'First name must have less than 21 characters.' })
      .trim(),
    lastName: z
      .string()
      .min(2, { message: 'Last name must have a minimum of 2 characters.' })
      .max(21, { message: 'Last name must have less than 21 characters.' })
      .trim(),
    employeeId: z
      .string()
      .nonempty({ message: 'Please insert your employer ID.' })
      .trim(),
    role: z.string().nonempty({ message: 'Please select your role.' }).trim(),
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
export type ContactType = z.infer<typeof contactSchema>;
export type OrderSchemaType = z.infer<typeof orderSchema>;
export type EmailSchemaType = z.infer<typeof emailSchema>;
export type PasswordSchemaType = z.infer<typeof passwordSchema>;
