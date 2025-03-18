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

export const getUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return {
      success: false,
      error: "Email and password are required",
      user: null,
    };
  }

  // Fetch user by email first
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  console.log("data: ", data);
  if (error || !data) {
    return {
      success: false,
      error: "User not found. Please check your email.",
      user: null,
    };
  }

  // Compare the provided password with the stored password.
  // (Note: In production, passwords should be hashed. Use bcrypt.compare if that's the case.)
  if (data.password !== password) {
    return {
      success: false,
      error: "Incorrect password. Please try again.",
      user: null,
    };
  }

  // If everything matches, return the user data.
  return { success: true, error: null, user: data };
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
