import { z } from "zod";

export const doctorformSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  specialization: z.string().min(1, "Please select a specialization"),
  availableTimeSlot: z.string().min(1, "Please select an available time slot"),
});
