import { supabase } from "./supabaseClient";

export const validateVoucher = async (voucherCode: string, userId: string) => {
  const { data: voucher, error: voucherError } = await supabase
    .from("voucher")
    .select("*")
    .eq("description", voucherCode)
    .single();

  if (voucherError || !voucher) {
    return { valid: false, message: "Voucher not found." };
  }

  const { data: userVoucher, error: userVoucherError } = await supabase
    .from("userVoucher")
    .select("*")
    .eq("user_id", userId)
    .eq("voucher_id", voucher.id)
    .single();

    if (userVoucherError || !userVoucher) {
        return { valid: false, message: "Voucher is not linked to your account." };
      }

  // Check expiry if needed
  const now = new Date();
  if (new Date(userVoucher.expiry_at) < now) {
    return { valid: false, message: "Voucher has expired." };
  }

  return { valid: true, message: "" };
};
