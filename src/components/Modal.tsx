import React from "react";

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  showPrivacyModal: () => void;
}

const MyModal: React.FC<MyModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showPrivacyModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-xl">
        {title && (
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
          </div>
        )}
        <div className="mb-6 text-white">
          By using this application, you agree to our{" "}
          <a onClick={() => showPrivacyModal()}>
            <u>Privacy Policy</u>
          </a>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
