import { z } from "zod";

/**
 * Reusable Zod validation schemas
 */

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password must not exceed 100 characters");

export const urlSchema = z
  .string()
  .url("Invalid URL format")
  .or(z.literal(""));

export const uuidSchema = z.string().uuid("Invalid unique identifier ID");

export const requiredStringSchema = (fieldName: string = "Value") =>
  z.string().trim().min(1, `${fieldName} is required`);

export const numericStringSchema = z
  .string()
  .regex(/^\d+$/, "Must be a numeric value")
  .transform(Number);

export const validators = {
  email: emailSchema,
  password: passwordSchema,
  url: urlSchema,
  uuid: uuidSchema,
  requiredString: requiredStringSchema,
  numericString: numericStringSchema,
};
