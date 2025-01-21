import React from "react";
import { IonContent, IonHeader, IonPage, IonToolbar, IonInput, IonButton } from "@ionic/react";
import "tailwindcss/tailwind.css";

const LandingPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-pink-500 text-white">
          <h1 className="text-center font-bold text-lg">Welcome to SGV Institute</h1>
        </IonToolbar>
      </IonHeader>
      <IonContent className="p-4 bg-gradient-to-b from-pink-100 to-white">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-semibold mb-4">Ready to Learn?</h2>
          <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <IonInput
              className="mb-4 p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              type="email"
              required
            />
            <IonInput
              className="mb-4 p-2 border border-gray-300 rounded"
              placeholder="Enter OTP"
              type="number"
              required
            />
            <IonButton expand="block" className="bg-pink-500">Login</IonButton>
          </form>
          <button className="text-pink-500 mt-4 underline" onClick={() => window.location.href = "/register"}>
            Don't have an account? Register
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;