"use client";

import { Card } from "@/components/ui/Card";
import { AllocationStats as AllocationStatsType } from "../types";

interface AllocationStatsProps {
  stats: AllocationStatsType;
}

export default function AllocationStats({
  stats,
}: AllocationStatsProps) {
  const cards = [
    {
      title: "ACTIVE ALLOCATIONS",
      value: stats.active,
      subtitle: "across departments",
    },
    {
      title: "UNALLOCATED",
      value: stats.unallocated,
      subtitle: "in asset pool",
    },
    {
      title: "PENDING TRANSFERS",
      value: stats.pending,
      subtitle: "awaiting approval",
    },
    {
      title: "TRANSFERS (JAN)",
      value: stats.completed,
      subtitle: "completed this month",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="p-6">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            {card.title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-zinc-900">
            {card.value}
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            {card.subtitle}
          </p>
        </Card>
      ))}
    </div>
  );
}