import React from "react";
import { IonAlert } from "@ionic/react";

interface ConfirmExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmExitModal: React.FC<ConfirmExitModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <IonAlert
      isOpen={isOpen}
      header="Warning!"
      message="If you go back, all your progress on this page will be lost. Are you sure you want to continue?"
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          handler: onClose,
        },
        {
          text: "Confirm",
          handler: onConfirm,
        },
      ]}
      onDidDismiss={onClose}
    />
  );
};

export default ConfirmExitModal;
