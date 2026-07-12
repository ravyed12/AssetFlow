"use server";

import { revalidatePath } from "next/cache";
import {
  employeeCreateSchema,
  employeeUpdateSchema,
  employeeToggleSchema,
  normalizeEmployeeCreateFormValues,
  normalizeEmployeeUpdateFormValues
} from "../schemas/employee-schema";
import {
  createEmployee,
  updateEmployee,
  toggleEmployeeStatus
} from "../services/employee.service";
import type {
  EmployeeMutationActionState,
  EmployeeToggleActionState
} from "../types";

const PEOPLE_PATH = "/people";

export async function createEmployeeAction(input: unknown): Promise<EmployeeMutationActionState> {
  try {
    const parsedValues = employeeCreateSchema.safeParse(input);

    if (!parsedValues.success) {
      return {
        success: false,
        error: {
          message: "Please correct the highlighted fields and try again.",
        },
        fieldErrors: parsedValues.error.flatten().fieldErrors,
      };
    }

    const result = await createEmployee(
      normalizeEmployeeCreateFormValues(parsedValues.data),
    );

    if (!result.success) {
      return {
        success: false,
        error: {
          message: result.error?.message ?? "Unable to create employee.",
        },
      };
    }

    revalidatePath(PEOPLE_PATH);

    return {
      success: true,
      data: {
        employeeId: result.data.employeeId,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: "Something went wrong while creating employee. Please try again.",
        details: error instanceof Error ? error.message : undefined,
      },
    };
  }
}

export async function updateEmployeeAction(input: unknown): Promise<EmployeeMutationActionState> {
  try {
    const parsedValues = employeeUpdateSchema.safeParse(input);

    if (!parsedValues.success) {
      return {
        success: false,
        error: {
          message: "Please correct the highlighted fields and try again.",
        },
        fieldErrors: parsedValues.error.flatten().fieldErrors,
      };
    }

    const result = await updateEmployee({
      id: parsedValues.data.id,
      ...normalizeEmployeeUpdateFormValues(parsedValues.data),
    });

    if (!result.success) {
      return {
        success: false,
        error: {
          message: result.error?.message ?? "Unable to update employee.",
        },
      };
    }

    revalidatePath(PEOPLE_PATH);

    return {
      success: true,
      data: {
        employeeId: result.data.employeeId,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: "Something went wrong while updating employee. Please try again.",
        details: error instanceof Error ? error.message : undefined,
      },
    };
  }
}

export async function toggleEmployeeStatusAction(input: unknown): Promise<EmployeeToggleActionState> {
  try {
    const parsedValues = employeeToggleSchema.safeParse(input);

    if (!parsedValues.success) {
      return {
        success: false,
        error: {
          message: "Unable to update employee status.",
          details: parsedValues.error.flatten().formErrors.join(", "),
        },
      };
    }

    const result = await toggleEmployeeStatus({
      id: parsedValues.data.id,
      active: parsedValues.data.active,
    });

    if (!result.success) {
      return {
        success: false,
        error: {
          message: result.error?.message ?? "Unable to update employee status.",
        },
      };
    }

    revalidatePath(PEOPLE_PATH);

    return {
      success: true,
      data: {
        employeeId: result.data.employeeId,
        active: result.data.active,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: "Something went wrong while updating employee status. Please try again.",
        details: error instanceof Error ? error.message : undefined,
      },
    };
  }
}
