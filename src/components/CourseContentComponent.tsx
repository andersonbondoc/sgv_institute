import React, { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { IonCard, IonCardContent, IonSearchbar, IonIcon } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import CourseContentSection from "./CourseContentSections";

const CourseContentComponent: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const { courseId } = useParams<{ courseId: string }>();
  const history = useHistory();

  const handleTakeExam = () => {
    history.push(`/course/${courseId}/exam`);
    window.location.reload();
  };

  const contents = [
    {
      id: 0,
      courseId: "PMFIDS",
      moduleId: "PMFIDS_PM",
      title: "Project Management Fundamentals, Tools, and Techniques",
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
    <div className="min-h-screen">
      {!selectedModule ? (
        <div className="space-y-6">
          <div className="w-full">
            <IonSearchbar placeholder="Search Modules..." className="mb-4" />
          </div>
          {contents.map((content) => (
            <IonCard
              key={content.id}
              onClick={() => setSelectedModule(content.moduleId)}
              className={`${content.bgColor} cursor-pointer hover:shadow-xl transition duration-300 rounded-lg`}
            >
              <IonCardContent className="flex items-center space-x-4">
                <img src={content.icon} alt={content.title} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="text-2xl font-bold text-stone-900">{content.title}</div>
                  <div className="text-xl mt-4 text-stone-900">{content.description}</div>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
          <div className="mt-4 flex justify-center items-center">
            <button
              onClick={handleTakeExam}
              className="px-4 py-4 bg-indigo-700 text-white rounded-lg flex items-center gap-2"
            > 
              <IonIcon icon={createOutline} size="small" />
              <span className="font-bold">Take Course Examination</span>
            </button>
          </div>
        </div>
      ) : (
        <CourseContentSection 
          moduleId={selectedModule} 
          onBackToModules={() => setSelectedModule(null)}
        />
      )}
    </div>
  );
};

export default CourseContentComponent;