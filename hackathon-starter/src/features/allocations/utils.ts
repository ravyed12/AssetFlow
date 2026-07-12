import { Allocation, AllocationStats, AllocationStatus } from "./types";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getStatusBadgeColor(status: AllocationStatus): string {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Reserved":
      return "bg-purple-100 text-purple-700";

    case "Maintenance":
      return "bg-orange-100 text-orange-700";

    default:
      return "bg-zinc-100 text-zinc-700";
  }
}

export function searchAllocations(
  allocations: Allocation[],
  query: string
): Allocation[] {
  if (!query.trim()) return allocations;

  const search = query.toLowerCase();

  return allocations.filter(
    (allocation) =>
      allocation.assetName.toLowerCase().includes(search) ||
      allocation.assetId.toLowerCase().includes(search) ||
      allocation.employeeName.toLowerCase().includes(search) ||
      allocation.department.toLowerCase().includes(search)
  );
}

export function filterByStatus(
  allocations: Allocation[],
  status: AllocationStatus | "All"
): Allocation[] {
  if (status === "All") return allocations;

  return allocations.filter(
    (allocation) => allocation.status === status
  );
}

export function calculateStats(
  allocations: Allocation[]
): AllocationStats {
  return {
    active: allocations.filter(
      (item) => item.status === "Active"
    ).length,

    unallocated: 14,

    pending: allocations.filter(
      (item) => item.status === "Pending"
    ).length,

    completed: 12,
  };
}