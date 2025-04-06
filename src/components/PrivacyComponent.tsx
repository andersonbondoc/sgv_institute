import React from "react";

interface PrivacyModalProps {
  onClose: () => void;
  onAccept: () => void;
  isAccepted: boolean;
  setIsAccepted: (value: boolean) => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({
  onClose,
  onAccept,
  isAccepted,
  setIsAccepted,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 dark:bg-gray-900 dark:bg-opacity-80">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full p-6 shadow-xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Privacy Policy and Terms of Use
        </h2>

        <div className="text-sm space-y-6 mb-8 overflow-y-auto max-h-[60vh] text-gray-800 dark:text-gray-300">
          <p>
            <strong>Date Updated:</strong> April 7, 2024
          </p>
          <p>
            Welcome to SGV FSO Academy ("Application," "we," "us," or "our").
            Your privacy is important to us, and this Privacy Policy explains
            how we collect, use, share, and protect your personal information.
          </p>
          <h3 className="font-semibold pt-2">
            1. Personal Information That We Collect
          </h3>
          <p>
            We may collect the following types of personal information when you
            use our application:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Account Information: Name and password.</li>
            <li>
              Learning Activity Data: Course progress and Pre- and Post-Module
              Examination scores.
            </li>
          </ul>
          <h3 className="font-semibold pt-2">
            2. How We Use Personal Information
          </h3>
          <ul className="list-disc list-inside ml-4">
            <li>
              Provide and improve the Application’s features and services.
            </li>
            <li>Manage user accounts and authenticate access.</li>
            <li>Personalize user experience and learning recommendations.</li>
            <li>Conduct research and analytics to improve our services.</li>
            <li>Comply with legal obligations and protect user security.</li>
          </ul>
          <h3 className="font-semibold pt-2">3. Cookies</h3>
          <p>
            We use cookies and similar tracking technologies to enhance your
            experience.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Essential Cookies: Required for core functionality.</li>
            <li>
              Analytics Cookies: Help us analyze user behavior and improve
              services.
            </li>
          </ul>
          <h3 className="font-semibold pt-2">
            4. How We Share Personal Information
          </h3>
          <p>
            We do not sell or rent personal information. However, we may share
            information with legal authorities if required by law.
          </p>
          <h3 className="font-semibold pt-2">
            5. Location of Personal Information
          </h3>
          <p>
            Your data may be stored on secure servers located in different
            jurisdictions...
          </p>
          <h3 className="font-semibold pt-2">6. How We Secure Information</h3>
          <ul className="list-disc list-inside ml-4">
            <li>Encryption of sensitive data.</li>
            <li>Secure access controls and authentication measures.</li>
            <li>Regular security audits and updates.</li>
          </ul>
          <h3 className="font-semibold pt-2">7. Access and Choice</h3>
          <ul className="list-disc list-inside ml-4">
            <li>Access, update, or correct your personal information.</li>
            <li>Request deletion of your account and associated data.</li>
          </ul>
          <h3 className="font-semibold pt-2">
            8. Retention of Personal Information
          </h3>
          <p>We retain personal information as long as necessary...</p>
          <h3 className="font-semibold pt-2">
            9. Contact, Notices, and Revisions
          </h3>
          <p>
            Contact us at Ruben.D.Simon@ph.ey.com or SGV Building 1, 6760 Ayala
            Avenue, 1200 Makati City, Metro Manila.
          </p>
          <h3 className="font-semibold pt-2">
            10. Philippine Data Privacy Framework
          </h3>
          <p>We comply with the Philippine Data Privacy Act of 2012...</p>
          <h3 className="font-semibold pt-2">
            11. Examples of Information Collected
          </h3>
          <ul className="list-disc list-inside ml-4">
            <li>Account Information: Name and password</li>
            <li>Learning Data: Course progress and exam scores</li>
          </ul>
          <h3 className="font-semibold pt-2">
            Terms and Conditions for Web-Based Learning Application
          </h3>
          <p>
            <strong>Last Updated:</strong> April 7, 2025
          </p>
          <p>
            By accessing or using this SGV FSO Web-Based Learning (WBL)
            application (the "Service"), you agree to be bound by these Terms
            and Conditions...
          </p>
          <p className="mt-4 font-semibold">
            By using our Service, you acknowledge that you have read,
            understood, and agree to these Terms and Conditions.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            id="accept"
            checked={isAccepted}
            onChange={(e) => setIsAccepted(e.target.checked)}
            className="w-5 h-5"
          />
          <label
            htmlFor="accept"
            className="text-sm text-gray-800 dark:text-gray-300"
          >
            I have read and agree to the Privacy Policy and Terms of Use.
          </label>
        </div>

        <div className="flex justify-end gap-4">
          {/* <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 text-sm text-gray-800 dark:text-gray-200"
          >
            Cancel
          </button> */}
          <button
            onClick={onAccept}
            disabled={!isAccepted}
            className={`px-5 py-2 rounded text-sm text-white ${
              isAccepted
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Accept &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
