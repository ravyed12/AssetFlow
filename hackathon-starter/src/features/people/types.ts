export interface Employee {
  id: string; // changed from number to string UUID
  name: string;
  email: string;
  avatar?: string;
  role: string;
  department: string;
  departmentId?: string | null; // added for form binding
  assets: number;
  assetValue: number;
  joined: string;
  status: "Active" | "Inactive" | "On Leave";
}

export interface Department {
  id: string; // changed from number to string UUID
  name: string;
  employees: number;
  assets: number;
  assetValue: number;
  color: string;
}

export interface StatCard {
  title: string;
  value: string;
  description: string;
}
export * from "./types/index";