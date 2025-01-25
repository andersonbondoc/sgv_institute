import React, { useState } from "react";
import { IonCard, IonCardContent } from "@ionic/react";

const CourseContentComponent: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  const contents = [
    {
      id: 1,
      title: "Project Management",
      description: "Learn the fundamentals of managing projects efficiently.",
    },
    {
      id: 2,
      title: "Budget and Cost Management",
      description: "Master the art of budgeting and managing project costs.",
    },
    {
      id: 3,
      title: "Project Risk Management",
      description: "Understand how to identify and mitigate project risks.",
    },
  ];

  const CourseContent: React.FC<{ content: { title: string; description: string } }> = ({
    content,
  }) => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{content.title}</h2>
      <p className="text-gray-700 text-lg mb-6">{content.description}</p>
      <button
        onClick={() => setSelectedContent(null)}
        className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
      >
        Back to Contents
      </button>
    </div>
  );

  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      {!selectedContent ? (
        <div className="space-y-6">
          {contents.map((content) => (
            <IonCard
              key={content.id}
              onClick={() => setSelectedContent(content.title)}
              className="cursor-pointer bg-white hover:shadow-xl transition duration-300 rounded-lg"
            >
              <IonCardContent>
                <h4 className="text-2xl font-semibold text-gray-800">{content.title}</h4>
                <p className="text-gray-600 text-base">{content.description}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      ) : (
        <CourseContent
          content={
            contents.find((c) => c.title === selectedContent) || {
              title: "Not Found",
              description: "Content not found. Please try again.",
            }
          }
        />
      )}
    </div>
  );
};

export default CourseContentComponent;