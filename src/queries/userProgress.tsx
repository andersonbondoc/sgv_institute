import { supabase } from "./supabaseClient";

export async function getUserProgress(userId: string, moduleId: string) {
  const { data, error } = await supabase
    .from("user_progress")
    .select("current_page, created_at")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .order("created_at", { ascending: false }) // Sort by latest created_at
    .limit(1); // Get only the latest one

  if (error) {
    console.error("Error fetching user progress:", error);
    return { data: null, error };
  }

  return { data: data?.[0] || null, error: null };
}

export async function insertUserProgress(
  userId: string,
  moduleId: string,
  current_page = 0
) {
  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("module_id", moduleId);

  if (error) {
    console.error("Error fetching user progress:", error);
    return { error };
  }

  if (!data || data.length === 0) {
    return await supabase
      .from("user_progress")
      .insert([{ user_id: userId, module_id: moduleId, current_page }]);
  } else {
    const latestRecord = data.reduce((latest, current) => {
      return new Date(current.created_at) > new Date(latest.created_at)
        ? current
        : latest;
    });
    return await supabase
      .from("user_progress")
      .update({ current_page })
      .eq("id", latestRecord.id);
  }
}
