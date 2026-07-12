"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Error } from "@/components/common";

import {
  DepartmentSidebar,
  EmployeeTable,
  StatsCards,
  Toolbar,
} from "./index";

import { EmployeeFormDialog } from "./employee-form-dialog";
import { toggleEmployeeStatusAction } from "../actions/employee-actions";
import type { PeopleManagementData } from "../types";
import type { Employee } from "../types";

interface PeopleScreenProps {
  initialData: PeopleManagementData;
}

export function PeopleScreen({ initialData }: PeopleScreenProps) {
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [search, setSearch] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [pendingEmployeeId, setPendingEmployeeId] = useState<string | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);

  // Map initialData.employees to matches for existing UI components
  const uiEmployees = useMemo(() => {
    const ROLE_LABELS: Record<string, string> = {
      ADMIN: "Admin",
      ASSET_MANAGER: "Asset Manager",
      DEPARTMENT_HEAD: "Department Head",
      EMPLOYEE: "Employee",
    };

    return initialData.employees.map((emp) => ({
      id: emp.id,
      name: emp.full_name,
      email: emp.email,
      role: ROLE_LABELS[emp.role] || emp.role,
      department: emp.department_name || "Unassigned",
      departmentId: emp.department_id,
      assets: emp.assets,
      assetValue: emp.assetValue,
      joined: emp.joined,
      status: emp.active ? ("Active" as const) : ("Inactive" as const),
    }));
  }, [initialData.employees]);

  // Client-side filtering as per guidelines
  const filteredEmployees = useMemo(() => {
    return uiEmployees.filter((employee) => {
      const matchesDepartment =
        selectedDepartment === "All" ||
        employee.department === selectedDepartment;

      const keyword = search.toLowerCase().trim();

      const matchesSearch =
        !keyword ||
        employee.name.toLowerCase().includes(keyword) ||
        employee.email.toLowerCase().includes(keyword);

      return matchesDepartment && matchesSearch;
    });
  }, [selectedDepartment, search, uiEmployees]);

  async function handleToggleStatus(employee: Employee) {
    setPageError(null);
    setPendingEmployeeId(employee.id);

    const result = await toggleEmployeeStatusAction({
      id: employee.id,
      active: employee.status !== "Active",
    });

    setPendingEmployeeId(null);

    if (!result.success) {
      setPageError(
        result.error?.message ??
          "Unable to update the employee status right now.",
      );
      return;
    }

    router.refresh();
  }

  return (
    <>
      <EmployeeFormDialog
        departmentOptions={initialData.departmentOptions}
        mode="create"
        onOpenChange={setCreateDialogOpen}
        open={createDialogOpen}
      />

      <EmployeeFormDialog
        employee={editingEmployee}
        departmentOptions={initialData.departmentOptions}
        mode="edit"
        onOpenChange={(open) => {
          if (!open) {
            setEditingEmployee(null);
          }
        }}
        open={Boolean(editingEmployee)}
      />

      <div className="space-y-6">
        {pageError ? (
          <Error
            className="rounded-xl"
            message={pageError}
            title="Action Failed"
          />
        ) : null}

        <Toolbar
          totalEmployees={filteredEmployees.length}
          search={search}
          onSearchChange={setSearch}
          onAddClick={() => setCreateDialogOpen(true)}
        />

        <div className="mt-8">
          <StatsCards stats={initialData.stats} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <DepartmentSidebar
              departments={initialData.departments}
              selectedDepartment={selectedDepartment}
              onSelectDepartment={setSelectedDepartment}
            />
          </div>

          <div className="lg:col-span-9">
            <EmployeeTable
              employees={filteredEmployees}
              onEdit={setEditingEmployee}
              onToggleStatus={handleToggleStatus}
              pendingEmployeeId={pendingEmployeeId}
            />
          </div>
        </div>
      </div>
    </>
  );
}
