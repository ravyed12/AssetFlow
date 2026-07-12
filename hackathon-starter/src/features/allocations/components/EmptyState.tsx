"use client";

import { PackageOpen, Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-20">

      <div className="rounded-full bg-zinc-100 p-5">

        <PackageOpen className="h-10 w-10 text-zinc-500" />

      </div>

      <h3 className="mt-6 text-xl font-semibold text-zinc-900">
        No Allocations Found
      </h3>

      <p className="mt-2 max-w-md text-center text-sm text-zinc-500">
        There are no asset allocations matching your current
        search or filters. Try changing the filters or create
        a new allocation.
      </p>

      <Button className="mt-6 gap-2">

        <Plus className="h-4 w-4" />

        Create Allocation

      </Button>

    </div>
  );
}