"use client";

import { useMemo, useState } from "react";

import { allocations } from "./data";
import {
  calculateStats,
  filterByStatus,
  searchAllocations,
} from "./utils";

import {
  AllocationStats,
  AllocationTable,
  TransferTabs,
  TransferToolbar,
} from "./components";

export default function AllocationPage() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<
    "All" | "Active" | "Pending" | "Reserved" | "Maintenance"
  >("All");

  const [department, setDepartment] =
    useState("All");

  const [tab, setTab] =
    useState("allocations");

  const filteredAllocations = useMemo(() => {
    let data = [...allocations];

    data = searchAllocations(data, search);

    data = filterByStatus(data, status);

    if (department !== "All") {
      data = data.filter(
        (item) =>
          item.department === department
      );
    }

    return data;
  }, [search, status, department]);

  const stats = useMemo(
    () => calculateStats(filteredAllocations),
    [filteredAllocations]
  );

  return (
    <main className="min-h-screen bg-zinc-100">

      <div className="mx-auto max-w-7xl space-y-6 p-8">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold tracking-tight">
            Asset Allocations
          </h1>

          <p className="mt-2 text-zinc-500">
            Track allocated assets,
            transfer requests and
            department assignments.
          </p>

        </div>

        {/* Stats */}

        <AllocationStats
          stats={stats}
        />

        {/* Tabs */}

        <TransferTabs
          activeTab={tab}
          onTabChange={setTab}
        />

        {/* Toolbar */}

        <TransferToolbar
          search={search}
          status={status}
          department={department}
          onSearchChange={setSearch}
          onStatusChange={(value) =>
            setStatus(
              value as
                | "All"
                | "Active"
                | "Pending"
                | "Reserved"
                | "Maintenance"
            )
          }
          onDepartmentChange={
            setDepartment
          }
        />

        {/* Table */}

        <AllocationTable
          allocations={
            filteredAllocations
          }
        />

      </div>

    </main>
  );
}