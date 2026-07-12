import { z } from "zod";
import { emailSchema, requiredStringSchema, uuidSchema } from "@/lib/validators";

const optionalUuidField = z.union([uuidSchema, z.literal(""), z.null()]);

export const employeeFormSchema = z.object({
  fullName: requiredStringSchema("Full name").max(
    120,
    "Full name must not exceed 120 characters",
  ),
  email: emailSchema.transform((val) => val.toLowerCase()),
  role: z.enum(["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD", "EMPLOYEE"]),
  departmentId: optionalUuidField.default(""),
  active: z.enum(["true", "false"]),
});

export const employeeCreateSchema = employeeFormSchema;

export const employeeUpdateSchema = z.object({
  id: uuidSchema,
  fullName: requiredStringSchema("Full name").max(
    120,
    "Full name must not exceed 120 characters",
  ),
  role: z.enum(["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD", "EMPLOYEE"]),
  departmentId: optionalUuidField.default(""),
  active: z.enum(["true", "false"]),
});

export const employeeToggleSchema = z.object({
  id: uuidSchema,
  active: z.boolean(),
});

export type EmployeeFormValues = z.input<typeof employeeFormSchema>;
export type EmployeeUpdateFormValues = z.input<typeof employeeUpdateSchema>;

export function normalizeEmployeeCreateFormValues(values: EmployeeFormValues) {
  return {
    full_name: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    role: values.role,
    department_id: values.departmentId || null,
    active: values.active === "true",
  };
}

export function normalizeEmployeeUpdateFormValues(values: EmployeeUpdateFormValues) {
  return {
    full_name: values.fullName.trim(),
    role: values.role,
    department_id: values.departmentId || null,
    active: values.active === "true",
  };
}
