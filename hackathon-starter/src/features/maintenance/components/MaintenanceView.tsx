"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MaintenanceRequest } from "../actions";
import { NewRequestModal } from "./NewRequestModal";
import {
  formatDueDate,
  getMaintStatusStyle,
  getPriorityStyle,
  isOverdue,
} from "@/lib/maintenance-ui";

const STATUS_COLUMNS = ["OPEN", "PENDING_APPROVAL", "IN_PROGRESS", "RESOLVED", "CLOSED"];

export function MaintenanceView({ requests: initial }: { requests: MaintenanceRequest[] }) {
  const [requests, setRequests] = useState(initial);
  const [view, setView] = useState<"list" | "board">("list");
  const [showModal, setShowModal] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const refresh = async () => {
    const res = await fetch("/api/maintenance");
    if (res.ok) setRequests(await res.json());
  };

  const openCount = requests.filter((request) => !["RESOLVED", "CLOSED"].includes(request.status.toUpperCase())).length;
  const overdueCount = requests.filter((request) => isOverdue(request.due_date, request.status)).length;
  const monthSpend = requests
    .filter((request) => {
      const createdAt = new Date(request.created_at);
      const now = new Date();
      return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
    })
    .reduce((sum, request) => sum + (request.cost ?? 0), 0);

  const chartData = useMemo(() => {
    const byMonth: Record<string, number> = {};
    requests.forEach((request) => {
      const createdAt = new Date(request.created_at);
      const key = createdAt.toLocaleString("en-US", { month: "short" });
      byMonth[key] = (byMonth[key] ?? 0) + (request.cost ?? 0);
    });
    return Object.entries(byMonth).map(([month, cost]) => ({ month, cost }));
  }, [requests]);

  const approve = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/maintenance/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error ?? "Failed to approve");
        return;
      }
      await refresh();
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-5">
      {showModal && <NewRequestModal onClose={() => setShowModal(false)} onSuccess={refresh} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#0F1117]">Maintenance</h1>
          <p className="mt-1 text-[13px] text-[#6B7280]">
            {openCount} open requests · {overdueCount} overdue · ${monthSpend.toLocaleString()} spend this month
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-[#E4E7EC] bg-white p-0.5">
            <button
              onClick={() => setView("list")}
              className={`rounded px-3 py-1.5 text-[13px] font-medium ${view === "list" ? "bg-[#0F1117] text-white" : "text-[#374151]"}`}
            >
              List
            </button>
            <button
              onClick={() => setView("board")}
              className={`rounded px-3 py-1.5 text-[13px] font-medium ${view === "board" ? "bg-[#0F1117] text-white" : "text-[#374151]"}`}
            >
              Board
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 rounded-md bg-[#0F1117] px-3.5 py-2 text-[13px] font-medium text-white hover:bg-[#1F2229]"
          >
            <Plus size={14} />
            New Request
          </button>
        </div>
      </div>

      {view === "list" ? (
        <ListView requests={requests} onApprove={approve} busyId={busyId} />
      ) : (
        <BoardView requests={requests} />
      )}

      <div className="rounded-lg border border-[#E4E7EC] bg-white p-5">
        <h2 className="text-[14px] font-semibold text-[#0F1117]">Maintenance spend</h2>
        <p className="mb-4 text-[12px] text-[#6B7280]">Monthly cost in USD</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
            <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
            <Line type="monotone" dataKey="cost" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ListView({
  requests,
  onApprove,
  busyId,
}: {
  requests: MaintenanceRequest[];
  onApprove: (id: string) => void;
  busyId: string | null;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#E4E7EC] bg-white">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#E4E7EC] bg-[#FAFAFA] text-[11px] uppercase tracking-wide text-[#9CA3AF]">
            <th className="px-5 py-3 font-medium">ID</th>
            <th className="px-5 py-3 font-medium">Asset</th>
            <th className="px-5 py-3 font-medium">Type</th>
            <th className="px-5 py-3 font-medium">Priority</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Requested By</th>
            <th className="px-5 py-3 font-medium">Assigned To</th>
            <th className="px-5 py-3 font-medium">Due</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F0F2F5] text-[13px] text-[#0F1117]">
          {requests.map((request) => {
            const status = getMaintStatusStyle(request.status);
            const priority = getPriorityStyle(request.priority);
            const overdue = isOverdue(request.due_date, request.status);
            return (
              <tr key={request.id} className="hover:bg-[#F8F9FB]">
                <td className="px-5 py-3.5 font-mono text-[12px] text-[#6B7280]">{request.id.slice(0, 8)}</td>
                <td className="px-5 py-3.5">
                  <div className="font-medium">{request.assets?.name ?? "—"}</div>
                  <div className="text-[12px] text-[#6B7280]">{request.assets?.asset_tag ?? ""}</div>
                </td>
                <td className="px-5 py-3.5 text-[#6B7280]">{request.type ?? "—"}</td>
                <td className={`px-5 py-3.5 ${priority.text}`}>{priority.label}</td>
                <td className="px-5 py-3.5">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${status.bg} ${status.text}`}>
                    {status.label}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-[#6B7280]">{request.raised_by_profile?.full_name ?? "—"}</td>
                <td className="px-5 py-3.5 text-[#6B7280]">{request.assigned_to_profile?.full_name ?? "—"}</td>
                <td className={`px-5 py-3.5 ${overdue ? "text-[#DC2626]" : "text-[#6B7280]"}`}>
                  {formatDueDate(request.due_date)}
                </td>
                <td className="px-5 py-3.5">
                  {request.status.toUpperCase() === "PENDING_APPROVAL" && (
                    <button
                      onClick={() => onApprove(request.id)}
                      disabled={busyId === request.id}
                      className="rounded-md bg-[#0F1117] px-3 py-1.5 text-[12px] font-medium text-white hover:bg-[#1F2229] disabled:opacity-50"
                    >
                      {busyId === request.id ? "Approving..." : "Approve"}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BoardView({ requests }: { requests: MaintenanceRequest[] }) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {STATUS_COLUMNS.map((column) => {
        const style = getMaintStatusStyle(column);
        const items = requests.filter((request) => request.status.toUpperCase() === column);
        return (
          <div key={column} className="rounded-lg border border-[#E4E7EC] bg-[#FAFAFA] p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${style.bg} ${style.text}`}>
                {style.label}
              </span>
              <span className="text-[11px] text-[#9CA3AF]">{items.length}</span>
            </div>
            <div className="space-y-2">
              {items.map((request) => {
                const priority = getPriorityStyle(request.priority);
                return (
                  <div key={request.id} className="rounded-md border border-[#E4E7EC] bg-white p-2.5 shadow-sm">
                    <div className="text-[12px] font-medium text-[#0F1117]">{request.assets?.name ?? "Untitled"}</div>
                    <div className="mt-1 text-[11px] text-[#6B7280]">{request.type}</div>
                    <div className={`mt-2 text-[11px] ${priority.text}`}>{priority.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
