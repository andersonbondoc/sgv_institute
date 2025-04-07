import React, { useEffect, useState } from "react";
import { IonCard, IonInput, IonIcon, IonListHeader } from "@ionic/react";
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  enterOutline,
} from "ionicons/icons";
import { ToastError, ToastSuccess } from "./Toast";
import {
  getUserByEmail,
  getUserByEmailAndPassword,
  onAccept,
  updateHasAccepted,
} from "../queries/userQueries";
import PrivacyModal from "./PrivacyComponent";

interface SignInModalProps {
  onClose: () => void;
  successToast: (message: string, timeout: number) => void;
  errorToast: (message: string, timeout: number) => void;
}

const SignInModal: React.FC<SignInModalProps> = ({
  onClose,
  successToast,
  errorToast,
}) => {
  const [email, setEmail] = useState("");
  const [userid, setUserId] = useState(0);
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [hasAcceptedPolicy, setHasAcceptedPolicy] = useState(false);

  const [isAccepted, setIsAccepted] = useState(false);

  const validateEmail = async () => {
    const { exists, error } = await getUserByEmail(email);
    console.log("exists: ", exists);
    if (!exists) {
      setIsEmailValid(false);
      setPassword("");
      errorToast(error || "Email validation failed.", 3000);
    } else {
      setIsEmailValid(true);
      successToast("Email validated successfully.", 3000);
    }
  };
  useEffect(() => {
    const fetchPrivacy = async () => {
      await updateHasAccepted(setIsAccepted, userid);
    };
    fetchPrivacy();
  }, [userid]);
  const handleUserLogin = async () => {
    const { exists, error } = await getUserByEmail(email);

    if (!exists) {
      setIsEmailValid(false);
      setPassword("");
      errorToast(error || "Email validation failed.", 3000);
    } else {
      setIsEmailValid(true);
      successToast("Email validated successfully.", 3000);
      const { success, loginError, user } = await getUserByEmailAndPassword(
        email,
        password
      );
      if (success) {
        successToast("Login successfully", 2000);
        const hasUserCheckedPrivacyContent = user.hasAcceptedPrivacy;
        setUserId(user.userid);
        setShowPrivacyModal(!hasUserCheckedPrivacyContent);
        localStorage.setItem("user", JSON.stringify(user));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        errorToast("Error", 3000);
      }
    }
  };
  const handleAccept = async () => {
    const updateUser = await onAccept(userid);
    console.log("updateUser: ", updateUser);
    setShowPrivacyModal(false);
    onClose();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleClose = () => {
    setShowPrivacyModal(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {showPrivacyModal && (
        <PrivacyModal
          onAccept={handleAccept}
          onClose={handleClose}
          isAccepted={isAccepted}
          setIsAccepted={setIsAccepted}
        />
      )}
      <IonCard className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-96 text-center relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Card Header */}
        <IonListHeader className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Login
        </IonListHeader>

        {/* Email Input with Validation */}
        <div className="relative">
          <IonInput
            type="email"
            placeholder="Enter your username"
            className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 pr-10 
              ${
                isEmailValid === false
                  ? "border-red-500"
                  : isEmailValid
                  ? "border-green-500"
                  : ""
              }`}
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
          {isEmailValid !== null && (
            <span className="absolute right-3 top-3 text-lg">
              {isEmailValid ? (
                <IonIcon
                  icon={checkmarkCircleOutline}
                  className="text-green-500"
                />
              ) : (
                <IonIcon icon={closeCircleOutline} className="text-red-500" />
              )}
            </span>
          )}
        </div>

        {/* Password Input */}
        <IonInput
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 border rounded-lg mt-4 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <button
          className="mt-6 w-full bg-gray-700 hover:bg-gray-900 text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
          onClick={handleUserLogin}
        >
          <IonIcon icon={enterOutline} size="small" />
          <span>Login</span>
        </button>
      </IonCard>
    </div>
  );
};

export default SignInModal;
