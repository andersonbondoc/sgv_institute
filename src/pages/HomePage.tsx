import React from "react";
import { IonContent, IonHeader, IonPage, IonToolbar, IonCard, IonCardContent, IonSearchbar, IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import { AcademicCapIcon, ShieldCheckIcon, LockClosedIcon } from "@heroicons/react/outline";

import "tailwindcss/tailwind.css";

const HomePage = () => {
    const categories = [
      { name: "Project Management", icon: <AcademicCapIcon className="h-6 w-6 text-pink-500" /> },
      { name: "Data Privacy", icon: <ShieldCheckIcon className="h-6 w-6 text-pink-500" /> },
      { name: "Data Security", icon: <LockClosedIcon className="h-6 w-6 text-pink-500" /> },
    ];
  
    const courses = [
      { id: 1, title: "Intro to Project Management", description: "Learn the basics of managing projects.", price: "$199" },
      { id: 2, title: "Data Privacy Essentials", description: "Understand data privacy regulations.", price: "$149" },
      { id: 3, title: "Advanced Data Security", description: "Secure systems effectively.", price: "$299" },
    ];
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar className="bg-pink-500 text-white">
            <h1 className="text-center font-bold text-lg">Home</h1>
          </IonToolbar>
        </IonHeader>
        <IonContent className="p-4">
          <IonSearchbar placeholder="Search courses..." className="mb-4"></IonSearchbar>
          <IonSegment className="flex overflow-auto">
            {categories.map((category, index) => (
              <IonSegmentButton key={index} className="mr-2">
                <div className="flex items-center">
                  {category.icon}
                  <IonLabel className="ml-2 text-pink-500">{category.name}</IonLabel>
                </div>
              </IonSegmentButton>
            ))}
          </IonSegment>
          <div className="mt-4">
            {courses.map((course) => (
              <IonCard key={course.id} className="mb-4">
                <IonCardContent>
                  <h2 className="text-lg font-semibold text-pink-500">{course.title}</h2>
                  <p className="text-gray-600 mb-2">{course.description}</p>
                  <p className="font-bold text-pink-500">{course.price}</p>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default HomePage;