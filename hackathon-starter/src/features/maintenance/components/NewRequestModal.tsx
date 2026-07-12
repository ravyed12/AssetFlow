"use client";

import { useEffect, useState } from "react";

type Asset = { id: string; name: string; asset_tag: string };

export function NewRequestModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    asset_id: "",
    type: "Hardware Repair",
    priority: "Medium",
    due_date: "",
    description: "",
  });

  useEffect(() => {
    fetch("/api/assets")
      .then((r) => r.json())
      .then((data) => setAssets(Array.isArray(data) ? data : []))
      .catch(() => setAssets([]));
  }, []);

  const setField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error ?? "Failed to create request");
        return;
      }

      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-[#0F1117]">New Maintenance Request</h2>
          <button onClick={onClose} className="text-[#6B7280] hover:text-[#0F1117]">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-[12px] font-medium text-[#374151]">Asset</label>
            <select
              className="input"
              value={form.asset_id}
              onChange={(e) => setField("asset_id", e.target.value)}
            >
              <option value="">Select an asset</option>
              {assets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.name} ({asset.asset_tag})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[12px] font-medium text-[#374151]">Type</label>
            <input
              className="input"
              value={form.type}
              onChange={(e) => setField("type", e.target.value)}
              placeholder="e.g. Hardware Repair"
            />
          </div>

          <div>
            <label className="mb-1 block text-[12px] font-medium text-[#374151]">Priority</label>
            <select
              className="input"
              value={form.priority}
              onChange={(e) => setField("priority", e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[12px] font-medium text-[#374151]">Due date</label>
            <input
              type="date"
              className="input"
              value={form.due_date}
              onChange={(e) => setField("due_date", e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-[12px] font-medium text-[#374151]">Description</label>
            <textarea
              className="input"
              rows={3}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-md border border-[#E4E7EC] py-2 text-[13px] font-medium text-[#374151] hover:bg-[#FAFAFA]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!form.asset_id || loading}
            className="flex-1 rounded-md bg-[#0F1117] py-2 text-[13px] font-medium text-white hover:bg-[#1F2229] disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Request"}
          </button>
        </div>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid #e4e7ec;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 13px;
          color: #0f1117;
        }
        .input:focus {
          outline: none;
          border-color: #4f46e5;
        }
      `}</style>
    </div>
  );
}
