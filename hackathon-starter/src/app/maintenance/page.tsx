import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { MaintenanceView } from "@/features/maintenance/components/MaintenanceView";
import { getMaintenanceRequests } from "@/features/maintenance/actions";

export default async function MaintenancePage() {
  const requests = await getMaintenanceRequests();

  return (
    <div className="flex h-screen bg-[#F7F8FA]">
      <Sidebar notificationCount={3} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar crumb="Maintenance" notificationCount={3} />
        <main className="flex-1 overflow-y-auto p-6">
          <MaintenanceView requests={requests} />
        </main>
      </div>
    </div>
  );
}
