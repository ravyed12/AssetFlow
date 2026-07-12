export type AllocationStatus =
  | "Active"
  | "Pending"
  | "Reserved"
  | "Maintenance";

export interface Allocation {
  id: string;
  assetId: string;
  assetName: string;

  employeeName: string;
  employeeAvatar?: string;

  department: string;

  assignedSince: string;

  value: number;

  status: AllocationStatus;
}

export interface AllocationStats {
  active: number;
  unallocated: number;
  pending: number;
  completed: number;
}