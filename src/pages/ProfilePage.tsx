import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";

const ProfilePage: React.FC = () => {
  const profile = {
    name: "Anderson",
    email: "anderson@ph.ey.com",
    phone: "+63 987654321",
    address: "123 Main Street, Cebu",
    company: "A Rural Bank",
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-indigo-500 text-white">
          <h2 className="text-center text-lg font-bold">My Profile</h2>
        </IonToolbar>
      </IonHeader>
      <IonContent className="p-6 bg-gray-50">
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
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
