import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const supabase = await createClient();
  const body = await req.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const update: Record<string, unknown> = {};

  if (body.action === "approve") {
    update.status = "IN_PROGRESS";
    update.approved_by = user.id;
  }

  if (body.action === "assign" && body.assigned_to) {
    update.assigned_to = body.assigned_to;
  }

  const { data, error } = await supabase
    .from("maintenance_requests")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
