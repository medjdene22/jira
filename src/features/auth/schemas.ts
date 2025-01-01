import { z } from "zod";


export const loginSchema = z.object({
    email: z.string().min(1, "email is required").email({
    message: "unvalid email"
  }),
    password: z.string().min(1, "password is required"),
});

export const rejesterSchema = z.object({
    name: z.string().trim().min(1, "name is required"),
    email: z.string().min(1, "email is required").email({
    message: "unvalid email"
  }),
    password: z.string().min(1, "password is required").min(8, "password must be at least 8 characters"),
});
  

export const AUTH_COOKIE = "imad-jira";