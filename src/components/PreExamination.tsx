import React, { useState, useEffect } from "react";

const PreExamPage = ({ sections }: any) => {
  const [preExamQuestions, setPreExamQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const sectionsArray = Array.isArray(sections) ? sections : [sections];
    if (sectionsArray.length > 0) {
      const preExamSection = sectionsArray.find(
        (section) => section.title === "Module Pre-Examination"
      );
      if (preExamSection) {
        const questions = preExamSection.exams.flatMap((exam: any) =>
          exam.questions.map((question: any) => ({
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

  const handleShowAnswer = () => {
    setIsAnswerShown(true);
    if (currentQuestion.fieldType === "single_select") {
      if (selectedAnswer[0] === currentQuestion.correctAnswer) {
        setFeedback("✅ Correct answer!");
      } else {
        setFeedback("❌ Wrong answer. Try again.");
      }
    } else {
      if (selectedAnswer.includes(currentQuestion.correctAnswer)) {
        setFeedback("✅ Correct answer!");
      } else {
        setFeedback("❌ Wrong answer. Try again.");
      }
    }
  };

  const handleNextQuestion = () => {
    setIsAnswerShown(false);
    setFeedback("");
    setSelectedAnswer([]);
    if (currentQuestionIndex < preExamQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setIsAnswerShown(false);
      setFeedback("");
      setSelectedAnswer([]);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className={" items-center items-center justify-items-center"}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">
          Question {currentQuestionIndex + 1} of {preExamQuestions.length}
        </h2>
        <div className="mb-6">
          <p className="text-xl font-medium">{currentQuestion.text}</p>
        </div>
        {currentQuestion.options && (
          <div className="mt-6">
            <div className="space-y-4">
              {currentQuestion.options.map(({ key, value }: any) => (
                <label
                  key={key}
                  className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  {currentQuestion.fieldType === "single_select" ? (
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={key}
                      checked={selectedAnswer.includes(key)}
                      onChange={(e) =>
                        !isAnswerShown &&
                        handleAnswerChange(e.target.value, e.target.checked)
                      }
                      disabled={isAnswerShown}
                      className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                  ) : (
                    <input
                      type="checkbox"
                      name={`question-${currentQuestionIndex}`}
                      value={key}
                      checked={selectedAnswer.includes(key)}
                      onChange={(e) =>
                        !isAnswerShown &&
                        handleAnswerChange(e.target.value, e.target.checked)
                      }
                      disabled={isAnswerShown}
                      className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                  )}
                  <span className="text-lg text-gray-800">{String(value)}</span>
                </label>
              ))}
            </div>
            <div className="mt-8">
              {!feedback && isAnswerSelected && (
                <button
                  onClick={handleShowAnswer}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
                >
                  Show Answer
                </button>
              )}

              {feedback && (
                <p className="text-3xl font-semibold mt-10">{feedback}</p>
              )}

              <div className="mt-8 flex justify-between">
                {currentQuestionIndex !== 0 ? (
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="py-3 px-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 disabled:opacity-50"
                  >
                    Previous
                  </button>
                ) : null}

                {currentQuestionIndex < preExamQuestions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
                  >
                    {currentQuestionIndex < preExamQuestions.length - 1
                      ? "Next Question"
                      : null}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreExamPage;
