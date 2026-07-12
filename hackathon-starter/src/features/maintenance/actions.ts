import { createClient } from "@/lib/supabase/server";

export type MaintenanceRequest = {
  id: string;
  asset_id: string;
  type: string;
  priority: string;
  status: string;
  due_date: string | null;
  cost: number | null;
  description: string | null;
  created_at: string;
  assets: { name: string; asset_tag: string } | null;
  raised_by_profile: { full_name: string } | null;
  assigned_to_profile: { full_name: string } | null;
  approved_by_profile: { full_name: string } | null;
};

const SELECT = `
  id, asset_id, status, created_at,
  assets:asset_id ( name, asset_tag ),
  raised_by_profile:raised_by ( full_name ),
  assigned_to_profile:assigned_to ( full_name ),
  approved_by_profile:approved_by ( full_name )
`;

export async function getMaintenanceRequests(): Promise<MaintenanceRequest[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("maintenance_requests")
    .select(SELECT)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as MaintenanceRequest[];
}
