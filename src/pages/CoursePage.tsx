import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonIcon,
  IonAlert,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import CourseContentComponent from "../components/CourseContentComponent";
import ConfirmExitModal from "../components/ConfirmExitModal";
import VoucherCard from "../components/VoucherCard";

const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const history = useHistory();
  const [courses, setCourses] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [showVoucherCard, setShowVoucherCard] = useState(true);

  useEffect(() => {
    fetch("/courseList.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch course list");
        }

        return response.json();
      })
      .then((data) => {
        const checkVoucher = localStorage.getItem("isCorrectVoucher");
        console.log("checkVoucher: ", checkVoucher);
        if (checkVoucher === "true") {
          setShowVoucherCard(false);
        } else {
          setShowVoucherCard(true);
        }
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course list:", error);
        setLoading(false);
      });
  }, []);

  const handleBackButton = () => {
    localStorage.removeItem("isCorrectVoucher");
    setModalOpen(false);
    history.goBack();
  };

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
              <IonButton onClick={handleBackButton}>
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

  const course = courses[courseId];

  return (
    <IonPage>
      {/* Header with Back Button */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setModalOpen(true)}>
              <IonIcon icon={arrowBackOutline} slot="start" />
              Back
            </IonButton>
          </IonButtons>
          <IonTitle>{course.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Course Content */}
      <IonContent className="p-6">
        <div className="max-w-6xl mx-auto p-4">
          <div className="text-center space-y-4 mt-4 hidden md:block lg:hidden">
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p>{course.description}</p>
            <p className="text-indigo-500 font-medium">{course.price}</p>
          </div>

          <CourseContentComponent />
          <ConfirmExitModal
            isOpen={modalOpen}
            onClose={handleBackButton}
            onConfirm={() => history.goBack()}
          />
        </div>
      </IonContent>
      {showVoucherCard && (
        <VoucherCard onClose={() => setShowVoucherCard(false)} />
      )}
    </IonPage>
  );
};

export default CoursePage;
