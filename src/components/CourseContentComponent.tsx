import React, { useState } from "react";
import { IonCard, IonCardContent } from "@ionic/react";
import CourseContentSection from "./CourseContentSections";

const CourseContentComponent: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const contents = [
    {
      id: 0,
      courseId: "PMFIDS",
      moduleId: "PMFIDS_PM",
      title: "Project Management",
      description: "Learn the fundamentals of managing projects efficiently.",
      icon: "/src/assets/abstract.png",
      bgColor: "bg-indigo-100",
    },
    {
      id: 1,
      courseId: "PMFIDS",
      moduleId: "PMFIDS_BCM",
      title: "Budget and Cost Management",
      description: "Master the art of budgeting and managing project costs.",
      icon: "/src/assets/abstract.png",
      bgColor: "bg-green-100",
    },
    {
      id: 2,
      courseId: "PMFIDS",
      moduleId: "PMFIDS_RISK",
      title: "Project Risk Management",
      description: "Understand how to identify and mitigate project risks.",
      icon: "/src/assets/abstract.png",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <div className="mt-2 p-2 bg-gray-50 min-h-screen">
      {!selectedModule ? (
        <div className="space-y-6">
          {contents.map((content) => (
            <IonCard
              key={content.id}
              onClick={() => setSelectedModule(content.moduleId)}
              className={`${content.bgColor} cursor-pointer hover:shadow-xl transition duration-300 rounded-lg`}
            >
              <IonCardContent className="flex items-center space-x-4">
                <img src={content.icon} alt={content.title} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="text-2xl font-semibold text-gray-800">{content.title}</h4>
                  <p className="text-gray-600 text-base">{content.description}</p>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      ) : (
        <CourseContentSection
        moduleId={selectedModule}
          onBackToModules={() => setSelectedModule(null)} // Function to navigate back
        />
      )}
    </div>
  );
};

export default CourseContentComponent;
