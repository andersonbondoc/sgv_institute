import React, { useEffect, useState } from "react";

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
  const [user, setUser] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setUser(false);
      return;
    } else {
      const user = JSON.parse(storedUser);
      setUser(true);
    }
  }, [user]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full p-6 shadow-xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Privacy Policy and Terms of Use
        </h2>
        <div className="text-sm space-y-6 mb-8 overflow-y-auto max-h-[60vh] text-gray-800 dark:text-gray-300">
          <p>
            <strong>Date Updated:</strong> April 8, 2024
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
          <p>
            You can manage cookie preferences through your browser settings.
          </p>
          <h3 className="font-semibold pt-2">
            4. How We Share Personal Information
          </h3>
          <ul className="list-disc list-inside ml-4">
            <li>
              {" "}
              We do not collect personal information or any information outside
              of the intended use of this Application.
            </li>
          </ul>
          <h3 className="font-semibold pt-2">5. How We Secure Information</h3>
          <p>
            We take appropriate technical and organizational measures to protect
            personal information from unauthorized access, alteration,
            disclosure, or destruction. These include:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Encryption of sensitive data.</li>
            <li>Secure access controls and authentication measures.</li>
            <li>Regular security audits and updates.</li>
          </ul>
          <h3 className="font-semibold pt-2">6. Access and Choice</h3>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Access, update, or correct your personal information.</li>
            <li>Request deletion of your account and associated data.</li>
          </ul>
          <p>
            You can manage these settings in your account or contact us for
            assistance.
          </p>
          <h3 className="font-semibold pt-2">
            7. Retention of Personal Information
          </h3>
          <p>
            We retain personal information as long as necessary for not longer
            than 6 months upon access of this web-based learning tool to fulfill
            our services, comply with legal obligations, and resolve disputes.
            When no longer needed, data is securely deleted or anonymized.
          </p>
          <h3 className="font-semibold pt-2">
            8. Contact, Notices, and Revisions
          </h3>
          <p>
            If you have any questions about this Privacy Policy, you may contact
            us at: Email: Ruben.D.Simon@ph.ey.com Address: SGV Building 1 6760
            Ayala Avenue 1200 Makati City Metro Manila
          </p>
          <p>
            We may update this policy from time to time. Any changes will be
            posted with a revised "Date Updated."
          </p>
          <h3 className="font-semibold pt-2">
            9. Philippine Data Privacy Framework
          </h3>
          <p>
            We comply with the Philippine Data Privacy Act of 2012 (RA 10173)
            and related regulations. Users have rights regarding data access,
            correction, and security as provided by Philippine law.
          </p>
          <h3 className="font-semibold pt-2">
            10. Examples of Information Collected
          </h3>
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Account Information</td>
                <td className="border px-4 py-2">Name and password</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Account Information</td>
                <td className="border px-4 py-2">
                  Course progress and exam scores
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="font-semibold pt-2">
            By using our Service, you acknowledge that you have read,
            understood, and agree to these Terms and Conditions.
          </h3>
          <h3 className="font-semibold pt-2">
            Terms and Conditions for Web-Based Learning Application
          </h3>
          <p>
            <strong>Last Updated:</strong> April 8, 2025
          </p>
          <h3 className="font-semibold pt-2">1. Acceptance of Terms</h3>
          <p>
            {" "}
            By accessing or using this SGV FSO Web-Based Learning (WBL)
            application (the "Service"), you agree to be bound by these Terms
            and Conditions. If you do not agree, please do not use the Service.
          </p>
          <h3 className="font-semibold pt-2">2. Use of Service</h3>
          <ul className="list-disc list-inside ml-4">
            <li>
              {" "}
              You may use the Service for learning purposes. You agree to use
              the Service in accordance with all applicable laws and not to
              misuse it in any way that could damage, disable, or impair its
              functionality.
            </li>
            <li>
              The Developer reserves the right to terminate or suspend a user's
              access to the Application without prior notice if it is determined
              that the user has engaged in malicious activity or behavior that
              compromises the security, integrity, or proper functioning of the
              platform. Additionally, any action that deviates from or
              undermines the intended purpose of the Application may result in
              termination
            </li>
          </ul>
          <h3 className="font-semibold pt-2">3. User Accounts</h3>
          <ul className="list-disc list-inside ml-4">
            <li>
              {" "}
              You are responsible for maintaining the confidentiality of your
              login information. You agree to notify us immediately of any
              unauthorized use of your account.
            </li>
          </ul>
          <h3 className="font-semibold pt-2">
            4. Content and Intellectual Property
          </h3>
          <ul className="list-disc list-inside ml-4">
            <li>
              {" "}
              All content provided through the Service, including text,
              graphics, logos, and course materials, is the intellectual
              property of the Service provider. You may not copy, reproduce,
              distribute, or create derivative works without explicit
              permission.
            </li>
          </ul>
          <h3 className="font-semibold pt-2">5. Privacy</h3>
          <ul className="list-disc list-inside ml-4">
            <li>
              {" "}
              Your use of the Service is subject to our Privacy Policy, which
              describes how we collect, use, and protect your personal
              information.
            </li>
          </ul>
          <h3 className="font-semibold pt-2">6. Disclaimer of Warranties</h3>
          <ul className="list-disc list-inside ml-4">
            <li>
              {" "}
              The Service is provided "as is" without warranties of any kind,
              either express or implied. We do not guarantee that the Service
              will be error-free, secure, or available always.
            </li>
          </ul>
          <h3 className="font-semibold pt-2">7. Limitation of Liability</h3>
          <ul className="list-disc list-inside ml-4">
            <li>
              {" "}
              In no event shall the Service provider be liable for any indirect,
              incidental, special, or consequential damages arising from the use
              or inability to use the Service, even if advised of the
              possibility of such damages.
            </li>
          </ul>
          <h3 className="font-semibold pt-2">8. Changes to Terms</h3>
          <ul className="list-disc list-inside ml-4">
            <li>
              {" "}
              We reserve the right to modify these Terms and Conditions at any
              time. Any changes will be posted on the website, and your
              continued use of the Service constitutes acceptance of the updated
              terms.
            </li>
          </ul>
          <h3 className="font-semibold pt-2">9. Governing Law</h3>
          <ul className="list-disc list-inside ml-4">
            <li>
              {" "}
              These Terms and Conditions are governed by and construed in
              accordance with the laws of the jurisdiction in which the Service
              provider operates, without regard to its conflict of law
              provisions.
            </li>
          </ul>
          <p className="mt-4 font-semibold">
            By using our Service, you acknowledge that you have read,
            understood, and agree to these Terms and Conditions.
          </p>
        </div>
        {user ? (
          <>
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
          </>
        ) : (
          <button
            onClick={onAccept}
            className={`px-5 py-2 rounded text-sm text-white bg-blue-600 hover:bg-blue-700`}
          >
            Accept &amp; Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default PrivacyModal;
