import React, { useState, useEffect } from "react";
import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import { closeCircle, arrowBack, arrowForward } from "ionicons/icons";

interface CourseContentSectionProps {
  moduleId: string;
  onBackToModules: () => void;
}

const CourseContentSection: React.FC<CourseContentSectionProps> = ({ moduleId, onBackToModules }) => {
  const [sections, setSections] = useState<any[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    import("../module.json").then((data) => {
      const courses = data.default;
      const filteredCourse = courses.find((course: any) => course.moduleId === moduleId);
  
      console.log("module", courses);
  
      if (filteredCourse) {
        setSections(filteredCourse.sections);
      }
    });
  }, [moduleId]);

  const currentSection = sections[currentSectionIndex];

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
        <div className="flex justify-end mb-4">
            <IonIcon icon={closeCircle} onClick={onBackToModules} size="large" className="p-2 mr-4 bg-indigo-500 text-white rounded-lg cursor-pointer"></IonIcon>
        </div>
      {sections.length > 0 && currentSectionIndex < sections.length ? (
        <IonCard className="p-2 bg-white shadow-md">
          <IonCardContent>
            <h1 className="text-2xl font-bold">{currentSection.title}</h1>
            <p className="text-gray-700 mt-2">{currentSection.body}</p>
            {currentSection.image && (
              <img
                src={currentSection.image}
                alt={currentSection.title}
                className="w-20 h-20 mt-4 rounded-lg"
              />
            )}
          </IonCardContent>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleBack}
              disabled={currentSectionIndex === 0}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
            >
              <IonIcon icon={arrowBack}/> Back
            </button>
            <button
              onClick={handleNext}
              disabled={currentSectionIndex === sections.length - 1}
              className="px-4 py-2 bg-indigo-700 text-white rounded-lg"
            >
              Next <IonIcon icon={arrowForward}/>
            </button>
          </div>
        </IonCard>
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