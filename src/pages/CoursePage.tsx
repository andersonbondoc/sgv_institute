import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon } from "@ionic/react";
import { arrowBackOutline, arrowForwardCircleOutline } from "ionicons/icons";
import CourseContentComponent from "../components/CourseContentComponent";

const CoursePage: React.FC = () => {
  const { courseCode } = useParams<{ courseCode: string }>();
  const history = useHistory();

  const courses = {
    PMFIDS: {
      courseCode: "PMFIDS",
      title: "Project Management Fundamentals for Implementation of Digital Solutions",
      description: "Master the art of managing complex projects efficiently.",
      price: "Free",
      icon: "/src/assets/abstract.png",
        bgColor: "bg-indigo-100",
    },
    DS100: {
      courseCode: "DS100",
      title: "Data Security",
      description: "Learn techniques to secure sensitive data in modern systems.",
      price: "Free",
    },
    DP100: {
      courseCode: "DP100",
      title: "Data Privacy",
      description: "Understand the principles of data privacy and compliance.",
      price: "Free",
    },
    CM100: {
      courseCode: "CM100",
      title: "Change Management",
      description: "Develop skills to manage and lead organizational changes.",
      price: "Free",
    },
    DG100: {
      courseCode: "DG100",
      title: "Data Governance",
      description: "Discover how to establish effective data governance policies.",
      price: "Free",
    },
  };
  

  const course = courses[courseCode as keyof typeof courses];

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
            <div className="text-center space-y-4 mt-10">
            <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
            <p className="text-gray-700">{course.description}</p>
            <p className="text-indigo-500 font-medium">{course.price}</p>
            </div>
            {/* <div className="mt-4 flex justify-center items-center">
                <IonButton
                className="text-sm px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md flex items-center space-x-2"
                fill="clear"
                >
                    <span>Take Course</span>
                    <IonIcon icon={arrowForwardCircleOutline} size="small"></IonIcon>
                </IonButton>
            </div> */}
           
            <CourseContentComponent />

        </div>
      </IonContent>
    </IonPage>
  );
};

export default CoursePage;