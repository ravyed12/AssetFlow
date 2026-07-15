"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileJson, FileSpreadsheet, X, Check, Loader2, AlertCircle } from "lucide-react";
import { Dialog, Button } from "@/components/ui";
import { importAssetsAction } from "@/features/assets/actions/asset-actions";

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportDialog({ open, onOpenChange }: ImportDialogProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[] | null>(null);
  const [status, setStatus] = useState<"idle" | "parsing" | "parsed" | "importing" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [importedCount, setImportedCount] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (file: File) => {
    setFile(file);
    setStatus("parsing");
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        if (file.name.endsWith(".json")) {
          const json = JSON.parse(text);
          if (Array.isArray(json)) {
            setParsedData(json);
            setStatus("parsed");
          } else {
            throw new Error("JSON file must contain an array of assets.");
          }
        } else {
          // Parse CSV
          const rows = parseCSV(text);
          if (rows.length > 0) {
            setParsedData(rows);
            setStatus("parsed");
          } else {
            throw new Error("CSV file must contain a header row and at least one asset row.");
          }
        }
      } catch (err: any) {
        setStatus("error");
        setErrorMessage(err.message || "Failed to parse file.");
      }
    };

    reader.onerror = () => {
      setStatus("error");
      setErrorMessage("Failed to read file.");
    };

    reader.readAsText(file);
  };

  // Helper to parse CSV properly handling quoted strings
  const parseCSV = (text: string): any[] => {
    const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
    if (lines.length < 2) return [];

    const headers = splitCSVRow(lines[0]);
    const assets: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = splitCSVRow(lines[i]);
      const asset: Record<string, any> = {};
      headers.forEach((header, index) => {
        const key = header.toLowerCase().replace(/[\s_-]+/g, "_");
        asset[key] = values[index] ?? null;
      });
      assets.push(asset);
    }

    return assets;
  };

  const splitCSVRow = (row: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"' || char === "'") {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result.map((val) => val.replace(/^["']|["']$/g, ""));
  };

  const handleImport = async () => {
    if (!parsedData) return;
    setStatus("importing");
    setErrorMessage(null);

    const result = await importAssetsAction(parsedData);
    if (result.success) {
      setImportedCount(result.count || parsedData.length);
      setStatus("success");
      router.refresh();
    } else {
      setStatus("error");
      setErrorMessage(result.error?.message || "Failed to import assets to database.");
    }
  };

  const resetDialog = () => {
    setFile(null);
    setParsedData(null);
    setStatus("idle");
    setErrorMessage(null);
    setImportedCount(0);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) resetDialog();
        onOpenChange(nextOpen);
      }}
      title="Import Assets"
      description="Upload a CSV or JSON file containing asset information. Missing categories and locations will be automatically created."
      size="lg"
    >
      <div className="space-y-6">
        {status === "idle" && (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-[#E4E7EC] hover:border-[#4F46E5] hover:bg-[#EEF2FF]/20 transition-all rounded-2xl p-10 text-center cursor-pointer flex flex-col items-center justify-center space-y-4"
            onClick={triggerFileSelect}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv,.json"
              className="hidden"
            />
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#4F46E5]/10 to-[#7C3AED]/10 text-[#4F46E5] flex items-center justify-center shadow-inner">
              <Upload size={22} />
            </div>
            <div className="space-y-1">
              <p className="text-[14px] font-bold text-[#0F1117]">Drag & Drop your file here</p>
              <p className="text-[12px] text-[#6B7280]">Supports CSV and JSON files (max 10MB)</p>
            </div>
            <Button variant="outline" className="h-9 px-4 rounded-xl text-[13px] border-[#E4E7EC] hover:bg-[#EEF2FF] hover:border-[#4F46E5] hover:text-[#4F46E5]" type="button">
              Browse Files
            </Button>
          </div>
        )}

        {status === "parsing" && (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <Loader2 className="animate-spin text-[#4F46E5]" size={36} />
            <p className="text-[14px] font-semibold text-[#0F1117]">Parsing your file...</p>
          </div>
        )}

        {status === "parsed" && parsedData && (
          <div className="space-y-4">
            {/* File info card */}
            <div className="flex items-center gap-3 bg-[#F8F9FA] border border-[#E4E7EC] p-3.5 rounded-xl">
              <div className="h-10 w-10 bg-white border border-[#E4E7EC] text-[#4F46E5] flex items-center justify-center rounded-lg shadow-sm">
                {file?.name.endsWith(".json") ? <FileJson size={18} /> : <FileSpreadsheet size={18} />}
              </div>
              <div className="flex-1 min-w-0 leading-tight">
                <p className="text-[13px] font-bold text-[#0F1117] truncate">{file?.name}</p>
                <p className="text-[11px] text-[#6B7280]">{parsedData.length} records ready to import</p>
              </div>
              <button
                onClick={resetDialog}
                className="h-8 w-8 hover:bg-[#F3F4F6] text-[#6B7280] hover:text-[#0F1117] flex items-center justify-center rounded-lg transition-all"
              >
                <X size={15} />
              </button>
            </div>

            {/* Preview table */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">Preview (First 3 rows)</p>
              <div className="border border-[#E4E7EC] rounded-xl overflow-hidden shadow-sm max-h-[180px] overflow-y-auto">
                <table className="w-full text-left text-[12px] border-collapse bg-white">
                  <thead className="bg-[#F8F9FA] text-[#374151] font-semibold border-b border-[#E4E7EC]">
                    <tr>
                      <th className="px-4 py-2">Tag</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Category</th>
                      <th className="px-4 py-2">Location</th>
                      <th className="px-4 py-2">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E7EC] text-[#4B5563]">
                    {parsedData.slice(0, 3).map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#F9FAFB]/50">
                        <td className="px-4 py-2 font-mono text-[11px] text-zinc-900">{row.asset_tag || row.tag || row.assetTag || "Auto-gen"}</td>
                        <td className="px-4 py-2 font-medium text-zinc-900 truncate max-w-[120px]">{row.name || row.asset_name || "Unnamed"}</td>
                        <td className="px-4 py-2 truncate max-w-[100px]">{row.category || row.category_name || "Uncategorized"}</td>
                        <td className="px-4 py-2 truncate max-w-[100px]">{row.location || row.location_name || "-"}</td>
                        <td className="px-4 py-2">${row.acquisition_cost || row.cost || "0"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 border-t border-[#E4E7EC] pt-4">
              <Button variant="outline" className="h-10 px-4 rounded-xl text-[13px] border-[#E4E7EC]" onClick={resetDialog}>
                Clear
              </Button>
              <Button className="h-10 px-5 rounded-xl text-[13px] bg-[#064E3B] hover:bg-[#043E2E] text-white" onClick={handleImport}>
                Import {parsedData.length} Assets
              </Button>
            </div>
          </div>
        )}

        {status === "importing" && (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <Loader2 className="animate-spin text-[#4F46E5]" size={36} />
            <p className="text-[14px] font-semibold text-[#0F1117]">Importing assets to database...</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
            <div className="h-12 w-12 rounded-full bg-[#E6F4EA] text-[#0F9D58] flex items-center justify-center shadow-md animate-bounce">
              <Check size={24} strokeWidth={3} />
            </div>
            <div className="space-y-1">
              <h3 className="text-[16px] font-bold text-[#0F1117]">Import Completed!</h3>
              <p className="text-[13px] text-[#6B7280]">
                {importedCount} assets have been successfully added to your organization.
              </p>
            </div>
            <Button
              className="h-10 px-5 rounded-xl text-[13px] bg-[#064E3B] text-white hover:bg-[#043E2E] mt-2"
              onClick={() => {
                resetDialog();
                onOpenChange(false);
              }}
            >
              Done
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="flex gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
              <AlertCircle className="shrink-0 text-red-500 mt-0.5" size={18} />
              <div className="space-y-1 leading-tight">
                <p className="text-[13px] font-bold">Failed to process import</p>
                <p className="text-[12px] text-red-600">{errorMessage}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-[#E4E7EC] pt-4">
              <Button variant="outline" className="h-10 px-4 rounded-xl text-[13px] border-[#E4E7EC]" onClick={resetDialog}>
                Try Another File
              </Button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}
