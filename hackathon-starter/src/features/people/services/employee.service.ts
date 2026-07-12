import "server-only";

import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format-date";
import type {
  PeopleManagementData,
  EmployeeMutationInput,
  UpdateEmployeeInput,
  ToggleEmployeeStatusInput,
  EmployeeListItem
} from "../types";

function formatEmployeeError(message: string) {
  return {
    success: false as const,
    error: {
      message,
    },
  };
}

export async function getPeopleManagementData() {
  const supabase = await createClient();

  const [profilesRes, departmentsRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, email, role, active, department_id, created_at, updated_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("departments")
      .select("id, name, status")
      .order("name"),
  ]);

  if (profilesRes.error) {
    return {
      success: false as const,
      error: {
        message: "Unable to load profiles right now.",
        details: profilesRes.error.message,
      },
    };
  }

  if (departmentsRes.error) {
    return {
      success: false as const,
      error: {
        message: "Unable to load departments right now.",
        details: departmentsRes.error.message,
      },
    };
  }

  const profiles = profilesRes.data;
  const dbDepartments = departmentsRes.data;

  const departmentNameById = new Map<string, string>();
  const employeeCountByDeptId = new Map<string, number>();

  dbDepartments.forEach((dept) => {
    departmentNameById.set(dept.id, dept.name);
    employeeCountByDeptId.set(dept.id, 0);
  });

  const employeesList: EmployeeListItem[] = profiles.map((profile) => {
    const deptId = profile.department_id;
    if (deptId && employeeCountByDeptId.has(deptId)) {
      employeeCountByDeptId.set(deptId, (employeeCountByDeptId.get(deptId) || 0) + 1);
    }

    const deptName = deptId ? departmentNameById.get(deptId) || "Unassigned" : "Unassigned";

    return {
      id: profile.id,
      full_name: profile.full_name,
      email: profile.email,
      role: profile.role,
      active: profile.active,
      department_id: deptId,
      created_at: profile.created_at,
      updated_at: profile.updated_at || profile.created_at,
      department_name: deptName,
      assets: 0,
      assetValue: 0,
      joined: formatDate(profile.created_at),
    };
  });

  const totalEmployeesCount = employeesList.length;

  const DEPARTMENT_COLORS: Record<string, string> = {
    Engineering: "#2563eb",
    Sales: "#16a34a",
    Marketing: "#db2777",
    Finance: "#f59e0b",
    HR: "#8b5cf6",
    Operations: "#06b6d4",
    Legal: "#ef4444",
  };

  function getDepartmentColor(name: string) {
    return DEPARTMENT_COLORS[name] ?? "#6b7280";
  }

  const sidebarDepartments = [
    {
      id: "all",
      name: "All",
      employees: totalEmployeesCount,
      assets: 0,
      assetValue: 0,
      color: "#111827",
    },
    ...dbDepartments.map((dept) => ({
      id: dept.id,
      name: dept.name,
      employees: employeeCountByDeptId.get(dept.id) || 0,
      assets: 0,
      assetValue: 0,
      color: getDepartmentColor(dept.name),
    })),
  ];

  const departmentOptions = dbDepartments.map((dept) => ({
    label: dept.status ? dept.name : `${dept.name} (Inactive)`,
    value: dept.id,
  }));

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const newJoinsThisMonth = profiles.filter((p) => p.created_at >= startOfMonth).length;

  const stats = [
    {
      title: "Employees",
      value: String(totalEmployeesCount),
      description: `+${newJoinsThisMonth} this month`,
    },
    {
      title: "Departments",
      value: String(dbDepartments.filter((d) => d.status).length),
      description: "Across organization",
    },
    {
      title: "Assets",
      value: "0",
      description: "$0 assigned",
    },
  ];

  return {
    success: true as const,
    data: {
      employees: employeesList,
      departments: sidebarDepartments,
      departmentOptions,
      stats,
    },
  };
}

export async function createEmployee(input: EmployeeMutationInput) {
  const supabase = await createClient();

  // Validate unique email in profiles
  const { data: existingProfile, error: emailCheckError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", input.email.toLowerCase())
    .maybeSingle();

  if (emailCheckError) {
    return formatEmployeeError("Unable to check email uniqueness right now.");
  }

  if (existingProfile) {
    return formatEmployeeError("An employee with this email already exists.");
  }

  if (input.department_id) {
    const { data: existingDept, error: deptCheckError } = await supabase
      .from("departments")
      .select("id")
      .eq("id", input.department_id)
      .maybeSingle();

    if (deptCheckError || !existingDept) {
      return formatEmployeeError("Selected department does not exist.");
    }
  }

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: crypto.randomUUID(), // Directly insert a newly generated UUID as primary key
      full_name: input.full_name,
      email: input.email,
      role: input.role,
      department_id: input.department_id,
      active: input.active,
      updated_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error) {
    return formatEmployeeError(`Failed to save employee profile: ${error.message}`);
  }

  return {
    success: true as const,
    data: {
      employeeId: data.id,
    },
  };
}

export async function updateEmployee(input: UpdateEmployeeInput) {
  const supabase = await createClient();

  if (input.department_id) {
    const { data: existingDept, error: deptCheckError } = await supabase
      .from("departments")
      .select("id")
      .eq("id", input.department_id)
      .maybeSingle();

    if (deptCheckError || !existingDept) {
      return formatEmployeeError("Selected department does not exist.");
    }
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: input.full_name,
      role: input.role,
      department_id: input.department_id,
      active: input.active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.id)
    .select("id")
    .single();

  if (error) {
    return formatEmployeeError(`Failed to update employee profile: ${error.message}`);
  }

  return {
    success: true as const,
    data: {
      employeeId: data.id,
    },
  };
}

export async function toggleEmployeeStatus(input: ToggleEmployeeStatusInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .update({
      active: input.active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.id)
    .select("id, active")
    .single();

  if (error) {
    return formatEmployeeError("Unable to update employee status right now.");
  }

  return {
    success: true as const,
    data: {
      employeeId: data.id,
      active: data.active,
    },
  };
}
