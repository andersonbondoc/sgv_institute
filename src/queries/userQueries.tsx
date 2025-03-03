import { supabase } from "./supabaseClient";

export const getUserByEmail = async (email: string) => {
  if (!email) {
    return { exists: false, error: "Email is required", user: null };
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) {
    return {
      exists: false,
      error: "User not found. Please enter a valid email.",
      user: null,
    };
  }

  return { exists: true, error: null, user: data };
};

export const supabaseSendEmail = async (email: string) => {
  if (!email) {
    return { success: false, error: "Email is required" };
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) {
    console.error("Error sending magic link:", error.message);
    return { success: false, error: "Error sending magic link." };
  }

  console.log("OTP sent successfully to email:", email);

  return { success: true };
};
