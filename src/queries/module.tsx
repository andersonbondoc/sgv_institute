import { supabase } from "./supabaseClient";

export async function getModuleForUser(userId: string, moduleId: string) {
  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .order("id", { ascending: false }) // Sort by latest id
    .limit(1); // Get only the latest one
  if (error) {
    console.error("Error fetching user progress:", error);
    return { data: null, error };
  }

  return { data: data?.[0] || null, error: null };
}

export async function insertModuleForUser(userId: string, moduleId: string) {
  const { data, error } = await supabase
    .from("modules")
    .insert([{ user_id: userId, module_id: moduleId }])
    .select();

  if (error) {
    throw error;
  }

  return data;
}
