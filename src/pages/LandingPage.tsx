import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonIcon,
  IonListHeader,
  IonInput,
  IonCard,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  arrowForwardCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  enterOutline,
} from "ionicons/icons";
import {
  getUserByEmail,
  getUserByEmailAndPassword,
  onAccept,
  supabaseSendEmail,
  updateHasAccepted,
} from "../queries/userQueries";
import { ToastError, ToastSuccess } from "../components/Toast";
import { supabase } from "../queries/supabaseClient";
import SignInModal from "../components/SignIn";
import PrivacyModal from "../components/PrivacyComponent";

const LandingPage: React.FC = () => {
  const history = useHistory();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("user"));

  const [isEmailValid, setIsEmailValid] = useState(false);

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [hasAcceptedPolicy, setHasAcceptedPolicy] = useState(false);

  const [isAccepted, setIsAccepted] = useState(false);

  const [userid, setUserId] = useState(0);
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);
  useEffect(() => {
    const isLogin = localStorage.getItem("user");
    if (!isLogin) {
      console.error("User not found");
      return;
    }
    const user = JSON.parse(isLogin);
    setUserId(user.userid);
    const hasUserCheckedPrivacyContent = user.hasAcceptedPrivacy;
    setShowPrivacyModal(!hasUserCheckedPrivacyContent);
    console.log("user.userid: ", user.userid);
    const fetchPrivacy = async () => {
      await updateHasAccepted(setIsAccepted, user.userid);
    };
    fetchPrivacy();
  }, [userid]);

  const handleTakeCourse = (courseId: string) => {
    const isLogin = localStorage.getItem("user");
    if (!isLogin) {
      console.error("User not found");
      return;
    }
    const user = JSON.parse(isLogin);
    setUserId(user.userid);
    const hasUserCheckedPrivacyContent = user.hasAcceptedPrivacy;
    setShowPrivacyModal(!hasUserCheckedPrivacyContent);
    if (isLogin) {
      history.push(`/course/${courseId}`);
    } else {
      setIsCardOpen(true);
    }
  };

  useEffect(() => {
    const cachedCourses = localStorage.getItem("courses");

    if (cachedCourses) {
      setCourses(JSON.parse(cachedCourses));
      setLoading(false);
    } else {
      fetch("/courseList.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch course list");
          }
          return response.json();
        })
        .then((data) => {
          const coursesArray = Object.values(data);
          setCourses(coursesArray);
          localStorage.setItem("courses", JSON.stringify(coursesArray));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching course list:", error);
          setLoading(false);
        });
    }
  }, []);

  const successToast = (message: string, timeout: number) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setSuccessMessage("");
    }, timeout);
  };

  const errorToast = (message: string, timeout: number) => {
    setErrorMessage(message);
    setShowErrorMessage(true);
    setTimeout(() => {
      setShowErrorMessage(false);
      setErrorMessage("");
    }, timeout);
  };

  if (loading) {
    return (
      <IonPage>
        <IonContent className="p-6 bg-gradient-to-b from-purple-50 via-pink-50 to-white flex items-center justify-center">
          <p>Loading courses...</p>
        </IonContent>
      </IonPage>
    );
  }

  const handleLogin = () => {
    setIsCardOpen(true);
  };

  const handleAccept = async () => {
    console.log("test", userid);
    const updateUser = await onAccept(userid);
    console.log("updateUser: ", updateUser);
    setShowPrivacyModal(false);
    setIsCardOpen(false);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  };

  const handleClose = () => {
    setShowPrivacyModal(false);
  };
  return (
    <IonPage>
      <IonContent className="p-6 bg-gradient-to-b from-purple-50 via-pink-50 to-white relative">
        <ToastSuccess message={successMessage} show={showSuccessMessage} />
        <ToastError message={errorMessage} show={showErrorMessage} />
        {isCardOpen && (
          <SignInModal
            onClose={() => setIsCardOpen(false)}
            successToast={successToast}
            errorToast={errorToast}
          />
        )}
        {showPrivacyModal && (
          <PrivacyModal
            onAccept={handleAccept}
            onClose={handleClose}
            isAccepted={isAccepted}
            setIsAccepted={setIsAccepted}
          />
        )}
        <div className="flex flex-col items-center space-y-4 pt-8 p-4">
          <div className="text-center space-y-2">
            <div className="w-12 mx-auto">
              <img
                src="/src/assets/sgv_logo.png"
                alt="SGV FSO Academy Logo"
                className="w-full logo"
              />
            </div>
            <h2 className="text-3xl font-bold">SGV FSO Academy</h2>
            <p>
              SGV FSO Academy offers a variety of courses to elevate your skills
              and knowledge.{" "}
            </p>
          </div>

          <div>
            <button>
              {!isLogin && (
                <span
                  onClick={handleLogin}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg flex items-center gap-2 cursor-pointer"
                >
                  <IonIcon icon={enterOutline} size="small" /> Login
                </span>
              )}
            </button>
          </div>

          <div
            className={`w-full max-w-md transition-opacity duration-300 ${
              isCardOpen ? "pointer-events-none opacity-40" : ""
            }`}
          >
            <IonSearchbar
              placeholder="Search courses..."
              className="mb-4 dark:[--background:#2d2d2d] dark:[--placeholder-color:#a1a1aa] dark:[--color:#ffffff]"
              style={{
                "--background": "#ffffff",
                "--placeholder-color": "#8e8e93",
                "--color": "#000000",
              }}
            />
          </div>

          <div className="w-full max-w-4xl space-y-2">
            <IonListHeader className="text-xl font-semibold light:text-gray-900">
              Recommended Courses
            </IonListHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div
                  key={course.courseId}
                  className="bg-white p-4 rounded-lg shadow-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-24 h-24 ${course.bgColor} rounded-full flex items-center justify-center shrink-0`}
                    >
                      <img
                        src={course.icon}
                        alt={`${course.title} Icon`}
                        className="w-20 h-24 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-yellow-600">
                        {course.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {course.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 mb-2 flex justify-between items-center">
                    <span className="text-indigo-500 font-medium">
                      {course.price}
                    </span>
                    <button
                      className="px-6 py-2 bg-indigo-700 text-white rounded-lg flex items-center gap-2"
                      onClick={() => handleTakeCourse(course.courseId)}
                    >
                      <span className="font-bold">Take Course</span>
                      <IonIcon icon={arrowForwardCircleOutline} size="small" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="footer">
            <div className="flex">
              <div>© 2025 SGV FSO All rights reserved.</div>
              <div className="ml-2">
                <a onClick={() => setShowPrivacyModal(true)}>
                  <u>Privacy Policy</u>
                </a>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
