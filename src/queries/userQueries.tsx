import { supabase } from "./supabaseClient";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (email: string) => {
  if (!email) {
    return { exists: false, error: "Email is required", user: null };
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", email)
    .single();

  if (error || !data) {
    return {
      exists: false,
      error: "User not found. Please enter a valid username.",
      user: null,
    };
  }

  return { exists: true, error: null, user: data };
};

// export const getUserByEmailAndPassword = async (
//   email: string,
//   password: string
// ) => {
//   if (!email || !password) {
//     return {
//       success: false,
//       error: "Email and password are required",
//       user: null,
//     };
//   }

//   // Fetch user by email first
//   const { data, error } = await supabase
//     .from("users")
//     .select("*")
//     .eq("username", email)
//     .single();
//   if (error || !data) {
//     return {
//       success: false,
//       error: "User not found. Please check your username.",
//       user: null,
//     };
//   }

//   // Compare the provided password with the stored password.
//   // (Note: In production, passwords should be hashed. Use bcrypt.compare if that's the case.)
//   if (data.password !== password) {
//     return {
//       success: false,
//       loginError: "Incorrect password. Please try again.",
//       user: null,
//     };
//   }

//   // If everything matches, return the user data.
//   return { success: true, loginError: null, user: data };
// };

export const hashPassword = async (password: any) => {
  // Generate a salt and hash the password
  const saltRounds = 10; // You can adjust the salt rounds as needed
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
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

  // Fetch user by email
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", email)
    .single();

  if (error || !data) {
    return {
      success: false,
      error: "User not found. Please check your username.",
      user: null,
    };
  }

  const isPasswordValid = bcrypt.compareSync(password, data.password);
  if (!isPasswordValid) {
    return {
      success: false,
      loginError: "Incorrect password. Please try again.",
      user: null,
    };
  }

  // If everything matches, return the user data
  return { success: true, loginError: null, user: data };
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

  return { success: true };
};

export const onAccept = async (userId: number) => {
  const { data, error } = await supabase
    .from("users")
    .update({ hasAcceptedPrivacy: true })
    .eq("userid", userId);
  if (error) {
    console.error("Error updating privacy acceptance:", error);
  } else {
    console.log("Privacy acceptance updated:", data);
  }
};

export const updateHasAccepted = async (
  setIsAccepted: (value: boolean) => void,
  userid: number
) => {
  const { data, error } = await supabase
    .from("users")
    .select("hasAcceptedPrivacy")
    .eq("userid", userid)
    .single();

  if (error) {
    console.error("Error fetching privacy status:", error);
    setIsAccepted(false);
  } else if (data) {
    setIsAccepted(!!data.hasAcceptedPrivacy);
  }
};
