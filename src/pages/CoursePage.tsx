import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonTitle, 
  IonIcon 
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import CourseContentComponent from "../components/CourseContentComponent";

const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const history = useHistory();
  const [courses, setCourses] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/courseList.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch course list");
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course list:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Loading...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="p-6">
          <p>Loading courses...</p>
        </IonContent>
      </IonPage>
    );
  }

  if (!courses) {
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
            <IonTitle>Error</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="p-6">
          <h2 className="text-xl text-red-500">Error loading courses.</h2>
        </IonContent>
      </IonPage>
    );
  }

  // Get the specific course based on courseId from the URL
  const course = courses[courseId];

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
      <IonContent className="p-6">
        <div className="p-4">
          <div className="text-center space-y-4 mt-4 hidden md:block lg:hidden">
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p>{course.description}</p>
            <p className="text-indigo-500 font-medium">{course.price}</p>
          </div>
          
          <CourseContentComponent />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CoursePage;