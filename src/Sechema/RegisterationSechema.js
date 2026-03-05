import z from "zod";

export const RegisterationSechema = z
  .object({
    name: z.string().min(3, "min chart is 3").max(10, "max chart 10"),
    username: z.string().min(3, "min chart is 3").max(10, "max chart 10"),
    email: z.string().email("email is not valid").min(1, "email is required"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Requirements: At least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
      )
      .min(1, "password is required"),
    rePassword: z.string().min(1, "password is required"),
    gender: z.enum(["male", "female"]),
    dateOfBirth: z
      .string()
      .refine(
        (value) => new Date(value) < new Date(),
        "Date Must Be In The Past",
      ),
  })
  .refine((values) => values.rePassword === values.password, {
    message: "rePassword not Match in Password",
    path: ["rePassword"],
  });

export const LoginSechema = z.object({
  email: z.string().email("email is not valid").min(1, "email is required"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Requirements: At least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
    )
    .min(1, "password is required"),
});

export const SettingSechema = z.object({
  newPassword: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Requirements: At least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
    )
    .min(1, "password is required"),
  password: z.string().min(1, "password is required"),
});
