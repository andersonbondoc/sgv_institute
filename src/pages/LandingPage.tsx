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
  supabaseSendEmail,
} from "../queries/userQueries";
import { ToastError, ToastSuccess } from "../components/Toast";
import { supabase } from "../queries/supabaseClient";

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
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      supabase.auth
        .signInWithOtp({ email: token })
        .then(({ data, error }) => {
          if (error) {
            console.error("Login failed:", error);
            errorToast("Login failed. Please try again.", 3000);
          } else {
            console.log("User Data:", data.user);
            if (data.user) {
              localStorage.setItem("user", JSON.stringify(data.user));
              setLoading(false);
            }
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);
          errorToast("An error occurred during login.", 3000);
        });
    }
    // else {
    //   errorToast("Invalid or expired link.", 3000);
    //   setLoading(false);
    // }
  }, [location.search, history]);

  const handleTakeCourse = (courseId: string) => {
    const isLogin = localStorage.getItem("user");
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
  const validateEmail = async () => {
    const { exists, error } = await getUserByEmail(email);
    if (!exists) {
      setIsEmailValid(false);
      setPassword("");
      errorToast(error || "Email validation failed.", 3000);
    } else {
      setIsEmailValid(true);
      successToast("Email validated successfully.", 3000);
    }
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

  const handleUserLogin = async () => {
    const { success, error, user } = await getUserByEmailAndPassword(
      email,
      password
    );
    if (success) {
      successToast("Login successfully", 2000);
      localStorage.setItem("user", JSON.stringify(user));
      // Reload the page after 2 seconds to allow the toast to show
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      errorToast("Error", 3000);
    }
  };

  return (
    <IonPage>
      <IonContent className="p-6 bg-gradient-to-b from-purple-50 via-pink-50 to-white relative">
        <ToastSuccess message={successMessage} show={showSuccessMessage} />
        <ToastError message={errorMessage} show={showErrorMessage} />
        {isCardOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <IonCard className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-96 text-center relative">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                onClick={() => setIsCardOpen(false)}
              >
                ✕
              </button>

              {/* Card Header */}
              <IonListHeader className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                Sign In
              </IonListHeader>

              {/* Email Input with Validation */}
              <div className="relative">
                <IonInput
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 pr-10 
            ${
              isEmailValid === false
                ? "border-red-500"
                : isEmailValid
                ? "border-green-500"
                : ""
            }`}
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  onBlur={validateEmail} // Triggers when user leaves the field
                />
                {/* Icon inside input field */}
                {isEmailValid !== null && (
                  <span className="absolute right-3 top-3 text-lg">
                    {isEmailValid ? (
                      <IonIcon
                        icon={checkmarkCircleOutline}
                        className="text-green-500"
                      />
                    ) : (
                      <IonIcon
                        icon={closeCircleOutline}
                        className="text-red-500"
                      />
                    )}
                  </span>
                )}
              </div>

              <IonInput
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg mt-4 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />

              {/* Login Button */}
              <button
                className="mt-6 w-full bg-gray-700 hover:bg-gray-900 text-white py-2 rounded-lg transition"
                disabled={!isEmailValid}
                onClick={handleUserLogin}
              >
                <IonIcon icon={enterOutline} size="small" /> Login
              </button>
            </IonCard>
          </div>
        )}

        <div className="flex flex-col items-center space-y-8 pt-8 p-4">
          <div className="text-center space-y-2">
            <div className="w-12 mx-auto">
              <img
                src="/src/assets/sgv_logo.png"
                alt="SGV Institute Logo"
                className="w-full logo"
              />
            </div>
            <h2 className="text-3xl font-bold">SGV FSO Institute</h2>
            <p>
              SGV FSO Institute offers a variety of courses to elevate your
              skills and knowledge.{" "}
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
                      className={`w-12 h-12 ${course.bgColor} rounded-full flex items-center justify-center`}
                    >
                      <img
                        src={course.icon}
                        alt={`${course.title} Icon`}
                        className="w-6 h-6"
                      />
                    </div>
                    <div>
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
