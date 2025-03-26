import { supabase } from "./supabaseClient";

export async function getUserProgress(userId: string, moduleId: string) {
  return supabase
    .from("user_progress")
    .select("current_page")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .single();
}

export async function insertUserProgress(
  userId: string,
  moduleId: string,
  current_page = 0
) {
  return supabase
    .from("user_progress")
    .insert([{ user_id: userId, module_id: moduleId, current_page }]);
}
