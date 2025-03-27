import { supabase } from "./supabaseClient";

export const validateVoucher = async (
  courseId: string,
  voucherCode: string,
  userId: string
) => {
  try {
    // 1️⃣ Find voucher by code
    const { data: voucher, error: voucherError } = await supabase
      .from("voucher")
      .select("*")
      .eq("description", voucherCode)
      .single();

    if (voucherError || !voucher) {
      return { valid: false, message: "Voucher not found." };
    }

    // 2️⃣ Check if the voucher is linked to the user
    const { data: userVoucher, error: userVoucherError } = await supabase
      .from("userVoucher")
      .select("*")
      .eq("user_id", userId)
      .eq("voucher_id", voucher.id)
      .eq("course_id", courseId)
      .single();

    if (userVoucherError) {
      console.error("Error fetching user voucher:", userVoucherError.message);
    }

    if (!userVoucher) {
      return {
        valid: false,
        message: "Voucher is not linked to your account.",
      };
    }

    // 3️⃣ Check if voucher is expired
    if (userVoucher.expiry_at) {
      const now = new Date();
      const expiryDate = new Date(userVoucher.expiry_at);

      if (expiryDate < now) {
        return { valid: false, message: "Voucher has expired." };
      }
    }

    // 4️⃣ Update the voucher activation status
    const { error: updateError } = await supabase
      .from("userVoucher")
      .update({ activated: true })
      .eq("id", userVoucher.id); // Assuming `id` is the primary key in `userVoucher`

    if (updateError) {
      console.error("Error updating voucher activation:", updateError.message);
      return {
        valid: false,
        message: "Failed to activate the voucher. Please try again.",
      };
    }

    // 5️⃣ Return valid response
    return {
      valid: true,
      data: voucher.description,
      message: "Voucher is valid and has been activated.",
    };
  } catch (error) {
    console.error("Validation error:", error);
    return {
      valid: false,
      message: "An error occurred while validating the voucher.",
    };
  }
};

export const isVoucherActivated = async (userId: string, courseId: string) => {
  try {
    const { data, error } = await supabase
      .from("userVoucher")
      .select("activated")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .single();
    if (error) {
      console.error("Error checking voucher activation:", error.message);
      return false;
    }

    return data?.activated === true;
  } catch (error) {
    console.error("Error in isVoucherActivated:", error);
    return false;
  }
};
