const { z } = require("zod");

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  mobile: z.coerce
    .number({
      required_error: "Mobile number is required",
      invalid_type_error: "Mobile number must be a number",
    })
    .refine(
      (num) => num.toString().length >= 10,
      "Mobile number must be at least 10 digits"
    ),
  doctor: z.string().min(1, "Please select a doctor"),
  date: z
    .date({
      required_error: "Please select a date",
      invalid_type_error: "Invalid date",
    })
    .refine((date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, "Please select a future date"),
  timing: z.string().min(1, "Please select a time slot"),
});
