"use client";

import { MoreHorizontal, Laptop } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

import { Allocation } from "../types";
import {
  formatCurrency,
  getStatusBadgeColor,
} from "../utils";

interface AllocationRowProps {
  allocation: Allocation;
}

export default function AllocationRow({
  allocation,
}: AllocationRowProps) {
  return (
    <tr className="border-b transition-colors hover:bg-zinc-50">

      {/* Asset */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-zinc-100 p-3">

            <Laptop className="h-5 w-5 text-zinc-700" />

          </div>

          <div>

            <h3 className="font-semibold text-zinc-900">
              {allocation.assetName}
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              {allocation.assetId}
            </p>

          </div>

        </div>

      </td>

      {/* Employee */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-3">

          <Avatar
            alt={allocation.employeeName}
            size="md"
          />

          <div>

            <p className="font-medium">
              {allocation.employeeName}
            </p>

            <p className="text-sm text-zinc-500">
              Assigned User
            </p>

          </div>

        </div>

      </td>

      {/* Department */}

      <td className="px-6 py-5">

        <Badge variant="secondary">
          {allocation.department}
        </Badge>

      </td>

      {/* Assigned */}

      <td className="px-6 py-5 text-sm text-zinc-600">

        {allocation.assignedSince}

      </td>

      {/* Value */}

      <td className="px-6 py-5 font-semibold">

        {formatCurrency(allocation.value)}

      </td>

      {/* Status */}

      <td className="px-6 py-5">

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeColor(
            allocation.status
          )}`}
        >
          {allocation.status}
        </span>

      </td>

      {/* Action */}

      <td className="px-6 py-5">

        <Button
          size="icon"
          variant="ghost"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>

      </td>

    </tr>
  );
}