"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription, AlertTitle, Button, Dialog, Input, Select, Spinner } from "@/components/ui";
import { createEmployeeAction, updateEmployeeAction } from "../actions/employee-actions";
import { employeeFormSchema, type EmployeeFormValues } from "../schemas/employee-schema";
import type { DepartmentOption, EmployeeMutationActionState } from "../types";
import type { Employee } from "../types";

interface EmployeeFormDialogProps {
  employee?: Employee | null;
  departmentOptions: DepartmentOption[];
  mode: "create" | "edit";
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const roleOptions = [
  { label: "Admin", value: "ADMIN" },
  { label: "Asset Manager", value: "ASSET_MANAGER" },
  { label: "Department Head", value: "DEPARTMENT_HEAD" },
  { label: "Employee", value: "EMPLOYEE" },
];

function getDefaultValues(employee?: Employee | null): EmployeeFormValues {
  const roleValue = roleOptions.find((r) => r.label === employee?.role)?.value || "EMPLOYEE";
  return {
    fullName: employee?.name ?? "",
    email: employee?.email ?? "",
    role: roleValue as any,
    departmentId: employee?.departmentId ?? "",
    active: employee?.status === "Inactive" ? "false" : "true",
  };
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }
  return <p className="text-sm text-red-600 dark:text-red-400">{message}</p>;
}

export function EmployeeFormDialog({
  employee,
  departmentOptions,
  mode,
  onOpenChange,
  open,
}: EmployeeFormDialogProps) {
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const {
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    mode: "onBlur",
    defaultValues: getDefaultValues(employee),
  });

  useEffect(() => {
    reset(getDefaultValues(employee));
    clearErrors();
  }, [clearErrors, employee, open, reset, mode]);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setSubmissionError(null);
      clearErrors();
    }
    onOpenChange(nextOpen);
  }

  const onSubmit = handleSubmit(async (values) => {
    setSubmissionError(null);
    clearErrors();

    const result: EmployeeMutationActionState =
      mode === "create"
        ? await createEmployeeAction(values)
        : await updateEmployeeAction({
            id: employee?.id,
            ...values,
          });

    if (!result.success) {
      if (result.fieldErrors) {
        for (const [fieldName, messages] of Object.entries(
          result.fieldErrors,
        ) as Array<[keyof EmployeeFormValues | "id", string[] | undefined]>) {
          const message = messages?.[0];
          if (!message || fieldName === "id") {
            continue;
          }
          setError(fieldName, {
            type: "server",
            message,
          });
        }
      }

      setSubmissionError(
        result.error?.message ??
          (mode === "create"
            ? "Unable to create employee."
            : "Unable to update employee."),
      );
      return;
    }

    handleOpenChange(false);
    router.refresh();
  });

  return (
    <Dialog
      description={
        mode === "create"
          ? "Add a new employee to the organization."
          : "Update the employee details."
      }
      onOpenChange={handleOpenChange}
      open={open}
      size="lg"
      title={mode === "create" ? "Add Employee" : "Edit Employee"}
    >
      <form className="space-y-5" noValidate onSubmit={onSubmit}>
        {submissionError ? (
          <Alert variant="destructive">
            <AlertTitle>
              {mode === "create" ? "Submission failed" : "Update failed"}
            </AlertTitle>
            <AlertDescription>{submissionError}</AlertDescription>
          </Alert>
        ) : null}

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            htmlFor={`${mode}-employee-name`}
          >
            Full Name
          </label>
          <Input
            id={`${mode}-employee-name`}
            placeholder="Enter full name"
            aria-invalid={errors.fullName ? "true" : "false"}
            disabled={isSubmitting}
            {...register("fullName")}
          />
          <FieldError message={errors.fullName?.message} />
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            htmlFor={`${mode}-employee-email`}
          >
            Email Address
          </label>
          <Input
            id={`${mode}-employee-email`}
            placeholder="Enter email address"
            type="email"
            aria-invalid={errors.email ? "true" : "false"}
            disabled={isSubmitting || mode === "edit"}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
              htmlFor={`${mode}-employee-department`}
            >
              Department
            </label>
            <Select
              id={`${mode}-employee-department`}
              aria-invalid={errors.departmentId ? "true" : "false"}
              disabled={isSubmitting}
              options={departmentOptions}
              placeholder="No department"
              {...register("departmentId")}
            />
            <FieldError message={errors.departmentId?.message} />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
              htmlFor={`${mode}-employee-role`}
            >
              Role
            </label>
            <Select
              id={`${mode}-employee-role`}
              aria-invalid={errors.role ? "true" : "false"}
              disabled={isSubmitting}
              options={roleOptions}
              placeholder="Select role"
              {...register("role")}
            />
            <FieldError message={errors.role?.message} />
          </div>
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            htmlFor={`${mode}-employee-status`}
          >
            Status
          </label>
          <Select
            id={`${mode}-employee-status`}
            aria-invalid={errors.active ? "true" : "false"}
            disabled={isSubmitting}
            options={[
              { label: "Active", value: "true" },
              { label: "Inactive", value: "false" },
            ]}
            {...register("active")}
          />
          <FieldError message={errors.active?.message} />
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner label="Saving employee" size="sm" /> : null}
            {isSubmitting
              ? mode === "create"
                ? "Creating..."
                : "Saving..."
              : mode === "create"
                ? "Add Employee"
                : "Save Changes"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
