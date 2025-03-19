import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import SignInModal from "../components/SignIn";
import { ToastError, ToastSuccess } from "../components/Toast";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
}

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
  });
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      console.error("User not found in localStorage");
      return;
    }
    const user = JSON.parse(storedUser);
    setProfile({
      name: `${user.firstname} ${user.lastname}`,
      email: `${user.email}`,
      phone: `${user.phone}`,
      address: `${user.address}`,
      company: `${user.organizationname}`,
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    history.push("/welcome");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // Toast success function
  const successToast = (message: string, timeout: number) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setSuccessMessage("");
    }, timeout);
  };

  // Toast error function
  const errorToast = (message: string, timeout: number) => {
    setErrorMessage(message);
    setShowErrorMessage(true);
    setTimeout(() => {
      setShowErrorMessage(false);
      setErrorMessage("");
    }, timeout);
  };

  // Check if a user exists in localStorage
  const isUserLoggedIn = Boolean(localStorage.getItem("user"));

  return (
    <>
      <IonPage>
        {/* Toast Notifications */}
        <ToastSuccess message={successMessage} show={showSuccessMessage} />
        <ToastError message={errorMessage} show={showErrorMessage} />
        <IonHeader>
          <IonToolbar className="bg-indigo-500 text-white">
            <h2 className="text-center text-lg font-bold">My Profile</h2>
            {isUserLoggedIn ? (
              <IonButton slot="end" onClick={handleLogout}>
                Logout
              </IonButton>
            ) : (
              <IonButton slot="end" onClick={() => setIsCardOpen(true)}>
                Sign In
              </IonButton>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent className="p-6">
          <div className="flex flex-col items-center space-y-6">
            {/* Profile Picture */}
            <div className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md overflow-hidden mt-8">
              <img
                src="/src/assets/abstract.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Information */}
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Personal Information
              </h3>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Company:</span>
                <span className="text-gray-800">{profile.company}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Name:</span>
                  <span className="text-gray-800">{profile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Email:</span>
                  <span className="text-gray-800">{profile.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Phone:</span>
                  <span className="text-gray-800">{profile.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Address:</span>
                  <span className="text-gray-800">{profile.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sign-in Card */}
          {isCardOpen && (
            <SignInModal
              onClose={() => setIsCardOpen(false)}
              successToast={successToast}
              errorToast={errorToast}
            />
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default ProfilePage;
