"use client";

import { useState } from "react";
import {
  DashboardHeader,
  AlertBanner,
  StatsGrid,
  AssetAnalytics,
  MaintenanceReminders,
  AssetListCard,
  TeamCollaboration,
  AssetUtilizationProgress,
  LiveTimeTracker,
  ImportDialog,
} from "./index";
import type { DashboardData } from "../types";

interface DashboardScreenProps {
  initialData: DashboardData;
}

export function DashboardScreen({ initialData }: DashboardScreenProps) {
  const { org, alert, stats, recentAssets } = initialData;
  const [importOpen, setImportOpen] = useState(false);

  const handleSync = () => {
    setImportOpen(true);
  };

  const handleRegisterAsset = () => {
    window.location.href = "/assets";
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] px-7 pb-14 pt-6 space-y-6">
      <ImportDialog open={importOpen} onOpenChange={setImportOpen} />

      {/* Header */}
      <DashboardHeader
        org={org}
        onSync={handleSync}
        onRegisterAsset={handleRegisterAsset}
      />

      {/* Alert banner if exists */}
      {alert && alert.items && alert.items.length > 0 && (
        <AlertBanner alert={alert} />
      )}

      {/* Stats cards (Donezo style) */}
      <StatsGrid stats={stats} />

      {/* Middle row grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Left side: spans 2/3 width on large screens */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2">
          <AssetAnalytics />
          <MaintenanceReminders />
        </div>

        {/* Right side: spans 1/3 width */}
        <AssetListCard assets={recentAssets} />
      </div>

      {/* Bottom row grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Allocations (Team Collaboration style) */}
        <TeamCollaboration assets={recentAssets} />

        {/* Progress Gauge */}
        <AssetUtilizationProgress />

        {/* Time Tracker */}
        <LiveTimeTracker />
      </div>
    </div>
  );
}
