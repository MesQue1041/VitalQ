import { z } from "zod";

export const UserFormValidation = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string()
    .refine(
      (phone) => {

        const phoneRegex = /^(?:(?:\+[1-9]\d{1,14})|(?:0[1-9]\d{8}))$/;
        return phoneRegex.test(phone);
      },
      {
        message: "Please enter a valid phone number (e.g., +94771234567 or +1234567890)",
      }
    )
});