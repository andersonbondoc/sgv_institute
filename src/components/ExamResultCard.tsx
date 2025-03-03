import React from "react";
import { IonIcon } from "@ionic/react";
import {
  closeCircle,
  checkmarkCircleOutline,
  readerOutline,
} from "ionicons/icons";

interface ExamResultCardProps {
  show: boolean;
  onClose: () => void;
  score: number;
  totalQuestion: number;
  title: string;
  onRetry?: () => void;
}

const ExamResultCard: React.FC<ExamResultCardProps> = ({
  show,
  onClose,
  score,
  totalQuestion,
  title,
  onRetry,
}) => {
  if (!show) return null;

  const numericPercentage = (score / totalQuestion) * 100;
  const percentage = numericPercentage.toFixed(2);
  const passed = numericPercentage >= 75;

  const resultMessage = passed
    ? "Congratulations for passing this course examination! 🥳🥳🥳"
    : "Unfortunately, you did not pass the course examination.";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>
      {/* Card */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="text-right">
          <IonIcon
            size="large"
            className="p-2 mr-4 rounded-lg cursor-pointer"
            onClick={onClose}
            icon={closeCircle}
          />
        </div>
        <div className="text-center">
          <h2 className="mt-6 text-3xl text-gray-800 font-semibold mb-4">
            {title}
          </h2>
          <div className="text-xl text-gray-800">
            <IonIcon
              size="large"
              className="p-2 mr-4 rounded-lg cursor-pointer text-indigo-600"
              icon={checkmarkCircleOutline}
            />
            <p className="mb-2">
              Your Score:{" "}
              <span className="font-bold">
                {score}/{totalQuestion}
              </span>
            </p>
            <p className="mb-4">
              Percentage: <span className="font-bold">{percentage}%</span>
            </p>
            <p className="mt-4 mb-4">{resultMessage}</p>
          </div>
          <div className="flex justify-center items-center">
            {passed ? (
              <button className="mb-4 px-6 py-2 bg-indigo-700 rounded-lg flex items-center gap-2 text-white">
                <IonIcon icon={readerOutline} />
                Download Certificate
              </button>
            ) : (
              <button
                onClick={onRetry}
                className="mb-4 px-6 py-2 bg-red-600 rounded-lg flex items-center gap-2 text-white"
              >
                Retry Exam
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResultCard;
