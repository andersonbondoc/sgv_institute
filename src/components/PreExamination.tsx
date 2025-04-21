import React, { useState, useEffect } from "react";
import ExamResultCard from "./ExamResultCard";
import { IonIcon } from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";

interface PreExamPageProps {
  sections: any;
  handleFinishQuestionButton: (score: any) => void;
}

const PreExamPage: React.FC<PreExamPageProps> = ({
  sections,
  handleFinishQuestionButton,
}) => {
  const [preExamQuestions, setPreExamQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const sectionsArray = Array.isArray(sections) ? sections : [sections];
    if (sectionsArray.length > 0) {
      const preExamSection = sectionsArray.find(
        (section) => section.title === "Module Pre-Examination"
      );
      const totalQuestion = preExamSection.exams.flatMap(
        (exam: any) => exam.questions
      ).length;
      setTotalQuestion(totalQuestion);
      if (preExamSection) {
        const questions = preExamSection.exams.flatMap((exam: any) =>
          exam.questions?.map((question: any) => ({
            text: question.q_statement,
            options: Object.entries(question.q_selection[0]).map(
              ([key, value]) => ({
                key,
                value,
              })
            ),
            fieldType: question.q_field_type,
            correctAnswer: question.q_answer,
          }))
        );
        setPreExamQuestions(questions);
      }
    }
  }, [sections]);

  if (preExamQuestions.length === 0) {
    return <div>Loading...</div>;
  }
  const currentQuestion = preExamQuestions[currentQuestionIndex];
  const isAnswerSelected = selectedAnswer.length > 0;
  const handleAnswerChange = (value: any, checked: any) => {
    if (currentQuestion.fieldType === "single_select") {
      setSelectedAnswer([value]);
    } else {
      if (checked) {
        setSelectedAnswer((prev) => [...prev, value]);
      } else {
        setSelectedAnswer((prev) => prev.filter((item) => item !== value));
      }
    }
  };

  const handleNextQuestion = () => {
    if (!isAnswerSelected) return;

    if (currentQuestion.fieldType === "single_select") {
      if (selectedAnswer[0] === currentQuestion.correctAnswer) {
        setScore((prev) => prev + 1);
      }
    } else {
      const correctAnswersArray = currentQuestion.correctAnswer
        .split(", ")
        .map((ans: any) => ans.trim());

      if (
        correctAnswersArray.every((ans: any) => selectedAnswer.includes(ans)) &&
        selectedAnswer.length === correctAnswersArray.length
      ) {
        setScore((prev) => prev + 1);
      }
    }
    setSelectedAnswer([]);
    if (currentQuestionIndex < preExamQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // const handlePreviousQuestion = () => {
  //   if (currentQuestionIndex > 0) {
  //     setSelectedAnswer([]);
  //     setCurrentQuestionIndex(currentQuestionIndex - 1);
  //   }
  // };

  const finishExam = () => {
    if (!isAnswerSelected) return;

    if (currentQuestion.fieldType === "single_select") {
      if (selectedAnswer[0] === currentQuestion.correctAnswer) {
        setScore((prev) => prev + 1);
      }
    } else {
      const correctAnswersArray = currentQuestion.correctAnswer
        .split(", ")
        .map((ans: any) => ans.trim());

      if (
        correctAnswersArray.every((ans: any) => selectedAnswer.includes(ans)) &&
        selectedAnswer.length === correctAnswersArray.length
      ) {
        setScore((prev) => prev + 1);
      }
    }
    localStorage.setItem("examScore", score.toString());
    setShowResult(true);
    handleFinishQuestionButton(score);
  };

  const handleRetryExam = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer([]);
    setShowResult(false);
  };

  return (
    <div className="items-center justify-items-center">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-[#111827]">
          Question {currentQuestionIndex + 1} of {preExamQuestions.length}
        </h2>
        <div className="mb-6">
          <p className="text-xl font-medium text-[#111827]">
            {currentQuestion?.text}
          </p>
        </div>
        {currentQuestion?.options && (
          <div className="mt-6">
            <div className="space-y-4">
              {currentQuestion?.options?.map(({ key, value }: any) => (
                <label
                  key={key}
                  className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  {currentQuestion?.fieldType === "single_select" ? (
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={key}
                      checked={selectedAnswer.includes(key)}
                      onChange={(e) =>
                        handleAnswerChange(e.target.value, e.target.checked)
                      }
                      className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                  ) : (
                    <input
                      type="checkbox"
                      name={`question-${currentQuestionIndex}`}
                      value={key}
                      checked={selectedAnswer.includes(key)}
                      onChange={(e) =>
                        handleAnswerChange(e.target.value, e.target.checked)
                      }
                      className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                  )}
                  <span className="text-lg text-[#111827]">
                    {String(value)}
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              {/* Placeholder for consistent positioning */}
              {/* <div className="w-36">
                {currentQuestionIndex !== 0 && (
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2 py-3 px-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 disabled:opacity-50"
                  >
                    <IonIcon icon={chevronBack} className="w-5 h-5" />
                    Previous
                  </button>
                )}
              </div> */}

              <button
                onClick={
                  currentQuestionIndex < preExamQuestions.length - 1
                    ? handleNextQuestion
                    : finishExam
                }
                disabled={!isAnswerSelected} // Disable button if no answer is selected
                className={`flex items-center gap-2 py-3 px-6 font-semibold rounded-lg shadow-md transition-colors duration-300 
    ${
      isAnswerSelected
        ? "bg-green-600 hover:bg-green-700 text-white"
        : "bg-gray-400 cursor-not-allowed text-gray-200"
    }`}
              >
                {currentQuestionIndex < preExamQuestions.length - 1 ? (
                  <>
                    Next Question
                    <IonIcon icon={chevronForward} className="w-5 h-5" />
                  </>
                ) : (
                  <>Finished</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      {/* {showResult && (
        <ExamResultCard
          show={showResult}
          onClose={() => setShowResult(false)}
          score={score}
          totalQuestion={totalQuestion}
          title="Pre-Examination"
          onRetry={handleRetryExam}
        />
      )} */}
    </div>
  );
};

export default PreExamPage;
