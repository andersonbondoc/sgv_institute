import React from "react";
import { IonLoading } from "@ionic/react";

interface LoaderSectionProps {
  isOpen: boolean;
  message?: string;
}

const LoaderSection: React.FC<LoaderSectionProps> = ({
  isOpen,
  message = "Please wait...",
}) => {
  return (
    <IonLoading
      isOpen={isOpen}
      spinner="crescent"
      message={message}
      duration={0}
      backdropDismiss={false}
    />
  );
};

export default LoaderSection;
