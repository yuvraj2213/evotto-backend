const { z } = require("zod");

const signupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be of atleast 3 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Name must be of atleast 3 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone number must be of 10 digits" })
    .max(10, { message: "Phone number must be of 10 digits" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be of atleast 6 characters" }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Name must be of atleast 3 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be of atleast 6 characters" }),
});

const feedbackSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be of atleast 3 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Name must be of atleast 3 characters" }),
  feedback: z
    .string({ required_error: "Feedback is required" })
    .trim()
    .min(3, { message: "Feedback must be of atleast 20 characters" }),
});

module.exports = { signupSchema, loginSchema, feedbackSchema };
