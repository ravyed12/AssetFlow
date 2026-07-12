"use client";

import { CheckCircle, Edit, MoreHorizontal, XCircle } from "lucide-react";

import { Dropdown } from "@/components/ui/Dropdown";
import { Employee } from "../types";

interface EmployeeMenuProps {
  disabled?: boolean;
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onToggleStatus: (employee: Employee) => void;
}

export default function EmployeeMenu({
  disabled = false,
  employee,
  onEdit,
  onToggleStatus,
}: EmployeeMenuProps) {
  const isCurrentlyActive = employee.status === "Active";

  const menuItems = [
    {
      label: (
        <span className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Edit Details
        </span>
      ),
      onSelect: () => onEdit(employee),
      disabled,
    },
    {
      label: (
        <span className="flex items-center gap-2">
          {isCurrentlyActive ? (
            <>
              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              Deactivate
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              Activate
            </>
          )}
        </span>
      ),
      onSelect: () => onToggleStatus(employee),
      destructive: isCurrentlyActive,
      disabled,
    },
  ];

  return (
    <Dropdown
      align="end"
      items={menuItems}
      label={<MoreHorizontal className="h-5 w-5" />}
      triggerClassName="h-8 w-8 p-0"
    />
  );
}
