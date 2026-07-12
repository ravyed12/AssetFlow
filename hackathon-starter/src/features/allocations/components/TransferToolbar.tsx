"use client";

import { Search, Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface TransferToolbarProps {
  search: string;
  status: string;
  department: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
}

const statuses = [
  "All",
  "Active",
  "Pending",
  "Reserved",
  "Maintenance",
];

const departments = [
  "All",
  "Engineering",
  "Design",
  "Finance",
  "HR",
  "Marketing",
  "Operations",
  "Sales",
];

export default function TransferToolbar({
  search,
  status,
  department,
  onSearchChange,
  onStatusChange,
  onDepartmentChange,
}: TransferToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 lg:flex-row">

        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />

          <Input
            value={search}
            placeholder="Search assets or employees..."
            className="pl-10"
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
          />
        </div>

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          className="h-10 rounded-md border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-500"
        >
          {statuses.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          value={department}
          onChange={(e) =>
            onDepartmentChange(e.target.value)
          }
          className="h-10 rounded-md border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-500"
        >
          {departments.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <Button className="gap-2">
        <Plus className="h-4 w-4" />
        Initiate Transfer
      </Button>
    </div>
  );
}