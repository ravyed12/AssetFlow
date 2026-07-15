import { DashboardLayout } from "@/components/layout";
import { BarChart3, TrendingUp, Package, Users, Wrench, Download } from "lucide-react";

const REPORT_CARDS = [
  {
    title: "Asset Overview",
    desc: "Total assets by category, status, and location",
    icon: Package,
    color: "from-[#4F46E5] to-[#7C3AED]",
    shadow: "shadow-indigo-500/20",
    badge: "Ready",
  },
  {
    title: "Allocation Report",
    desc: "Assets allocated per employee and department",
    icon: Users,
    color: "from-[#0EA5E9] to-[#2563EB]",
    shadow: "shadow-blue-500/20",
    badge: "Ready",
  },
  {
    title: "Maintenance Summary",
    desc: "Open, in-progress and resolved maintenance requests",
    icon: Wrench,
    color: "from-[#F59E0B] to-[#D97706]",
    shadow: "shadow-amber-500/20",
    badge: "Ready",
  },
  {
    title: "Asset Utilisation",
    desc: "Booking frequency and idle asset identification",
    icon: TrendingUp,
    color: "from-[#10B981] to-[#059669]",
    shadow: "shadow-emerald-500/20",
    badge: "Ready",
  },
];

export default function ReportsPage() {
  return (
    <DashboardLayout crumb="Reports">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] shadow-lg shadow-indigo-500/30">
            <BarChart3 size={18} strokeWidth={2} className="text-white" />
          </div>
          <h1 className="text-[22px] font-bold text-[#0F1117] tracking-tight">Reports</h1>
        </div>
        <p className="ml-12 text-[14px] text-[#6B7280]">Download and view operational reports across all modules</p>
      </div>

      {/* Report cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {REPORT_CARDS.map((card) => (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            {/* Icon */}
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-lg ${card.shadow}`}>
              <card.icon size={20} strokeWidth={2} className="text-white" />
            </div>

            <span className="mb-2 inline-block rounded-full bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#059669]">
              {card.badge}
            </span>

            <h3 className="text-[15px] font-bold text-[#0F1117]">{card.title}</h3>
            <p className="mt-1 text-[13px] text-[#6B7280] leading-relaxed">{card.desc}</p>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] py-2.5 text-[13px] font-semibold text-[#374151] transition-all hover:border-[#4F46E5] hover:bg-[#EEF2FF] hover:text-[#4F46E5]">
              <Download size={14} strokeWidth={2} />
              Export CSV
            </button>
          </div>
        ))}
      </div>

      {/* Coming soon banner */}
      <div className="mt-8 rounded-2xl border border-dashed border-[#C7D2FE] bg-[#EEF2FF]/60 p-8 text-center">
        <BarChart3 size={36} strokeWidth={1.5} className="mx-auto mb-3 text-[#818CF8]" />
        <h3 className="text-[16px] font-bold text-[#4F46E5]">Visual Analytics Coming Soon</h3>
        <p className="mt-1.5 text-[13px] text-[#6B7280]">
          Interactive charts, trend lines, and KPI dashboards will appear here in the next release.
        </p>
      </div>
    </DashboardLayout>
  );
}
