import type { ActionResponse } from "@/types";
import type { EmployeeFormValues } from "../schemas/employee-schema";

export interface ProfileRecord {
  id: string;
  full_name: string;
  email: string;
  role: "ADMIN" | "ASSET_MANAGER" | "DEPARTMENT_HEAD" | "EMPLOYEE";
  active: boolean;
  department_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmployeeListItem extends ProfileRecord {
  department_name: string | null;
  assets: number;
  assetValue: number;
  joined: string;
}

export interface DepartmentOption {
  disabled?: boolean;
  label: string;
  value: string;
}

export interface PeopleManagementData {
  employees: EmployeeListItem[];
  departments: {
    id: string;
    name: string;
    employees: number;
    assets: number;
    assetValue: number;
    color: string;
  }[];
  departmentOptions: DepartmentOption[];
  stats: {
    title: string;
    value: string;
    description: string;
  }[];
}

export interface EmployeeMutationInput {
  full_name: string;
  email: string;
  role: "ADMIN" | "ASSET_MANAGER" | "DEPARTMENT_HEAD" | "EMPLOYEE";
  department_id: string | null;
  active: boolean;
}

export interface UpdateEmployeeInput {
  id: string;
  full_name: string;
  role: "ADMIN" | "ASSET_MANAGER" | "DEPARTMENT_HEAD" | "EMPLOYEE";
  department_id: string | null;
  active: boolean;
}

export interface ToggleEmployeeStatusInput {
  id: string;
  active: boolean;
}

type EmployeeFieldErrorKey = keyof EmployeeFormValues | "id";

export type EmployeeFieldErrors = Partial<
  Record<EmployeeFieldErrorKey, string[] | undefined>
>;

export type EmployeeMutationActionState = ActionResponse<{
  employeeId: string;
}> & {
  fieldErrors?: EmployeeFieldErrors;
};

export type EmployeeToggleActionState = ActionResponse<{
  employeeId: string;
  active: boolean;
}>;
