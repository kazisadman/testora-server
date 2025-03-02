import { z } from "zod";

const userRegistrationValidation = z.object({
  name: z.string().trim(),
  email: z.string().email({ message: "Invalid email address" }),
  image: z.string(),
  password: z.string(),
});

export { userRegistrationValidation };
