import { supabase } from "./supabaseClient";

export async function getModuleForUser(userId: string, moduleId: string) {
  return supabase
    .from("modules")
    .select("*")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .maybeSingle();
}

export async function insertModuleForUser(userId: string, moduleId: string) {
  return supabase
    .from("modules")
    .insert([{ user_id: userId, module_id: moduleId }]);
}
