import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon } from "@ionic/react";
import { arrowBackOutline, arrowForwardCircleOutline } from "ionicons/icons";
import CourseContentComponent from "../components/CourseContentComponent";

const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const history = useHistory();

  const courses = {
    PMFIDS: {
      courseId: "PMFIDS",
      title: "Project Management Fundamentals for Implementation of Digital Solutions",
      description: "Master the art of managing complex projects efficiently.",
      price: "Free",
      icon: "/src/assets/abstract.png",
        bgColor: "bg-indigo-100",
    },
    DS100: {
      courseId: "DS100",
      title: "Data Security",
      description: "Learn techniques to secure sensitive data in modern systems.",
      price: "Free",
    },
    DP100: {
      courseId: "DP100",
      title: "Data Privacy",
      description: "Understand the principles of data privacy and compliance.",
      price: "Free",
    },
    CM100: {
      courseId: "CM100",
      title: "Change Management",
      description: "Develop skills to manage and lead organizational changes.",
      price: "Free",
    },
    DG100: {
      courseId: "DG100",
      title: "Data Governance",
      description: "Discover how to establish effective data governance policies.",
      price: "Free",
    },
  };
  

  const course = courses[courseId as keyof typeof courses];

  if (!course) {
    return (
      <IonPage>
        <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} slot="start" />
              Back
            </IonButton>
          </IonButtons>
          <IonTitle>Not Found</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent className="p-6">
          <h2 className="text-xl text-red-500">Course not found!</h2>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      {/* Header with Back Button */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} slot="start" />
              Back
            </IonButton>
          </IonButtons>
          <IonTitle>{course.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Course Content */}
      <IonContent className="p-6 bg-gray-50">
        <div className="p-4">
            <div className="text-center space-y-4 mt-4 hidden md:block lg:hidden">
                <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                <p className="text-gray-700">{course.description}</p>
                <p className="text-indigo-500 font-medium">{course.price}</p>
            </div>
            
           
            <CourseContentComponent />

        </div>
      </IonContent>
    </IonPage>
  );
};

export default CoursePage;