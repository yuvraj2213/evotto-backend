const { z } = require("zod");

const signupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Email must be at least 3 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone number must be 10 digits" })
    .max(10, { message: "Phone number must be 10 digits" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),

  role: z
    .string({ required_error: "Role is required" })
    .trim()
    .min(4, { message: "Invalid Role" }),

  companyName: z
    .string()
    .trim()
    .min(1, { message: "Company Name must be at least 1 character" })
    .optional()
    .refine(
      (companyName, ctx) => {
        // Check role from the request body passed in the middleware
        const role = ctx.parent?.role;
        if (role === "vendor" && !companyName) {
          return false;
        }
        return true;
      },
      {
        message: "Company name is required for vendors",
        path: ["companyName"],
      }
    ),
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
