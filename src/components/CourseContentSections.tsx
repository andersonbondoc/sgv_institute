import { useEffect, useState } from "react";
import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import { arrowDown, arrowUp, closeCircle } from "ionicons/icons";
import { motion } from "framer-motion";

interface CourseContentSectionProps {
  moduleId: string;
  onBackToModules: () => void;
}

const CourseContentSection: React.FC<CourseContentSectionProps> = ({ moduleId, onBackToModules }) => {
  const [sections, setSections] = useState<any[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    import("../module.json").then((data) => {
      const courses = data.default;
      const filteredCourse = courses.find((course: any) => course.moduleId === moduleId);

      if (filteredCourse) {
        setSections(filteredCourse.sections);
      }
    });
  }, [moduleId]);

  const currentSection = sections[currentSectionIndex];

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setSelectedAnswer(null);
      setFeedback(null);
      setAnimationKey((prev) => prev + 1);
      setCurrentSectionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentSectionIndex > 0) {
      setSelectedAnswer(null);
      setFeedback(null);
      setAnimationKey((prev) => prev + 1);
      setCurrentSectionIndex((prev) => prev - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value);
    setFeedback(value === currentSection.q_answer ? "✅ Correct answer!" : "❌ Wrong answer. Try again.");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex justify-end">
        <IonIcon
          icon={closeCircle}
          onClick={onBackToModules}
          size="large"
          className="p-2 mr-4 rounded-lg cursor-pointer text-gray-400"
        />
      </div>

      {sections.length > 0 && currentSectionIndex < sections.length ? (
        <motion.div
          key={animationKey}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <IonCard className="p-4 bg-white shadow-lg rounded-xl">
            <IonCardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {currentSection.image && (
                  <div className="flex justify-center">
                    <img
                      src={currentSection.image}
                      alt={currentSection.title}
                      className="w-full max-w-md h-auto rounded-lg shadow-md"
                    />
                  </div>
                )}

                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-6">{currentSection.title}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-6">{currentSection.subheader}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-6">{currentSection.subheader1}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-6">{currentSection.subheader2}</div>
                  <div className="text-xl text-gray-700 mt-4">{currentSection.body}</div>
                  <div className="text-xl text-gray-700 mt-4">{currentSection.body1}</div>

                  {currentSection.list1 && (
                    <ul className="list-disc list-inside text-2xl text-gray-700 mt-4">
                      {currentSection.list1.split(";").map((item: string, index: number) => (
                        <li className="text-base/8" key={`list1-${index}`}>{item.trim()}</li>
                      ))}
                    </ul>
                  )}

                  {currentSection.list2 && (
                    <ul className="list-disc list-inside text-2xl text-gray-700 mt-4">
                      {currentSection.list2.split(";").map((item: string, index: number) => (
                        <li className="text-base/8" key={`list2-${index}`}>{item.trim()}</li>
                      ))}
                    </ul>
                  )}

                  {currentSection.list3 && (
                    <ul className="list-disc list-inside text-2xl text-gray-700 mt-4">
                      {currentSection.list3.split(";").map((item: string, index: number) => (
                        <li className="text-base/8" key={`list3-${index}`}>{item.trim()}</li>
                      ))}
                    </ul>
                  )}

                  {currentSection.numberedlist && (
                    <ol className="list-disc list-inside text-2xl text-gray-700 mt-4">
                      {currentSection.numberedlist.split(";").map((item: string, index: number) => (
                        <li className="text-base/8" key={`numberedlist-${index}`}>{item.trim()}</li>
                      ))}
                    </ol>
                  )}

                  {currentSection.title === "Knowledge Check" && currentSection.q_selection && (
                    <div className="mt-6">
                      <div className="space-y-4">
                        {Object.entries(currentSection.q_selection[0]).map(([key, value]) => (
                          <label key={key} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
                            <input
                              type="radio"
                              name="knowledge-check"
                              value={key}
                              checked={selectedAnswer === key}
                              onChange={(e) => handleAnswerChange(e.target.value)}
                              className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <span className="text-lg text-gray-800">{String(value)}</span>
                          </label>
                        ))}
                      </div>
                      <div className="mt-8">
                        {feedback && <p className="text-3xl font-semibold">{feedback}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </IonCardContent>

            <div className="flex justify-between mt-6 px-4 pb-4">
                <button
                    onClick={handleBack}
                    disabled={currentSectionIndex === 0}
                    className="w-12 h-12 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center"
                >
                    <IonIcon icon={arrowUp} />
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentSectionIndex === sections.length - 1}
                    className="w-12 h-12 bg-indigo-700 text-white rounded-full flex items-center justify-center"
                >
                    <IonIcon icon={arrowDown} />
                </button>
            </div>
          </IonCard>
        </motion.div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold">No content available</h2>
          <button
            onClick={onBackToModules}
            className="mt-4 px-4 py-2 bg-indigo-700 text-white rounded-lg"
          >
            Back to Modules
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseContentSection;