import { useState, useRef, useEffect } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonInput,
  IonItem,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { validateVoucher, isVoucherActivated } from "../queries/voucherQueries";

const VoucherCard = ({ onClose, courseId }: any) => {
  const history = useHistory();
  const [voucherError, setVoucherError] = useState("");
  const voucherInputRef = useRef("");
  useEffect(() => {
    const checkVoucher = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setVoucherError("User not found. Please log in again.");
        return;
      }
      const user = JSON.parse(storedUser);
      const userId = user.userid;
      const fetchData = await isVoucherActivated(userId, courseId);
      if (fetchData) {
        setVoucherError("");
        onClose();
      }
    };
    checkVoucher();
  }, [courseId]);
  const handleApply = async () => {
    const voucherCode = voucherInputRef.current;
    if (!voucherCode) {
      setVoucherError("Please enter a voucher code.");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setVoucherError("User not found. Please log in again.");
      return;
    }
    const user = JSON.parse(storedUser);
    const userId = user.userid;
    const result = await validateVoucher(courseId, voucherCode, userId);
    if (result.valid && result.data === voucherCode) {
      setVoucherError("");
      onClose();
    } else {
      setVoucherError(result.message);
    }
  };

  const handleCancel = () => {
    localStorage.removeItem("isCorrectVoucher");
    history.goBack();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <IonCard className="p-6 shadow-lg w-96 bg-white rounded-lg">
        <IonCardHeader className="text-xl font-semibold text-center text-yellow-600 mb-4">
          Enter Voucher Code
        </IonCardHeader>
        <IonCardContent>
          <IonItem
            style={{
              "--background": "#e5e7eb",
              "--padding-start": "12px",
              height: "60px",
            }}
          >
            <IonInput
              label="Click to type your voucher code"
              labelPlacement="floating"
              placeholder="Enter your voucher code"
              onIonInput={(e) => {
                voucherInputRef.current = e.detail.value?.trim() || "";
                if (!voucherInputRef.current) {
                  setVoucherError(""); // Clear error when input is cleared
                }
              }}
              className="p-2 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-200 text-sm text-black"
            ></IonInput>
          </IonItem>
          {voucherError && (
            <p className="text-red-600 text-center mt-2 text-sm">
              {voucherError}
            </p>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <IonButton
              fill="solid"
              color="default"
              onClick={handleCancel}
              className="w-24 text-sm font-medium text-yellow-600 rounded-md transition-all duration-200 hover:bg-gray-100 hover:border-yellow-600"
            >
              Cancel
            </IonButton>
            <IonButton
              fill="solid"
              color="warning"
              onClick={handleApply}
              className="w-24 text-sm font-medium text-white rounded-md transition-all duration-200 hover:!bg-yellow-600 active:opacity-80"
            >
              Apply
            </IonButton>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default VoucherCard;
