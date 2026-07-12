"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import { Card } from "@/components/ui/Card";

import AllocationRow from "./AllocationRow";
import EmptyState from "./EmptyState";

import { Allocation } from "../types";

interface AllocationTableProps {
  allocations: Allocation[];
}

export default function AllocationTable({
  allocations,
}: AllocationTableProps) {
  return (
    <Card className="overflow-hidden rounded-2xl">

      <div className="border-b border-zinc-200 px-6 py-5">

        <h2 className="text-lg font-semibold text-zinc-900">
          Current Asset Allocations
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          View and manage all allocated company assets.
        </p>

      </div>

      {allocations.length === 0 ? (
        <EmptyState />
      ) : (
        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>Asset</TableHead>

              <TableHead>Assigned To</TableHead>

              <TableHead>Department</TableHead>

              <TableHead>Assigned Since</TableHead>

              <TableHead>Value</TableHead>

              <TableHead>Status</TableHead>

              <TableHead className="w-14" />

            </TableRow>

          </TableHeader>

          <TableBody>

            {allocations.map((allocation) => (
              <AllocationRow
                key={allocation.id}
                allocation={allocation}
              />
            ))}

          </TableBody>

        </Table>
      )}
    </Card>
  );
}