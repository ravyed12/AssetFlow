import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const SELECT = `
  id, asset_id, status, created_at,
  assets:asset_id ( name, asset_tag ),
  raised_by_profile:raised_by ( full_name ),
  assigned_to_profile:assigned_to ( full_name ),
  approved_by_profile:approved_by ( full_name )
`;

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("maintenance_requests")
    .select(SELECT)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("maintenance_requests")
    .insert({
      asset_id: body.asset_id,
      type: body.type,
      priority: body.priority,
      status: "OPEN",
      due_date: body.due_date || null,
      description: body.description || null,
      raised_by: user.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
