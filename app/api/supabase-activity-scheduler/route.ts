import { createClient } from "@/utils/supabase/client";
const supabase = createClient();

export async function GET() {
  console.log("Fetching data from keep-alive table...");
  try {
    const { data, error } = await supabase.from("keep-alive").select();
    if (error) throw new Error(error.message);
    console.log("Data fetched successfully:", data);
    return Response.json(data);
  } catch (error) {
    const message = (error as Error).message ?? "An error occurred.";
    console.error("Error fetching data:", message);
    return Response.json({ error: message, details: error }, { status: 400 });
  }
}
