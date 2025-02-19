import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonSearchbar, IonIcon } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { arrowForwardCircleOutline } from "ionicons/icons";

const LandingPage: React.FC = () => {
  const history = useHistory();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleTakeCourse = (courseId: string) => {
    history.push(`/course/${courseId}`);
  };

  useEffect(() => {
    fetch("/courseList.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch course list");
        }
        return response.json();
      })
      .then((data) => {
        // Convert the object to an array using Object.values.
        setCourses(Object.values(data));
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
        <IonContent className="p-6 bg-gradient-to-b from-purple-50 via-pink-50 to-white flex items-center justify-center">
          <p>Loading courses...</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent className="p-6 bg-gradient-to-b from-purple-50 via-pink-50 to-white">
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
              SGV FSO Institute offers a variety of courses to elevate your skills and knowledge.
            </p>
          </div>

          <div className="w-full max-w-md">
            <IonSearchbar placeholder="Search courses..." className="mb-4" />
          </div>

          <div className="w-full max-w-4xl space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Recommended Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div key={course.courseId} className="bg-white p-4 rounded-lg shadow-lg">
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
                      <h4 className="text-lg font-medium text-yellow-600">{course.title}</h4>
                      <p className="text-sm text-gray-600">{course.description}</p>
                    </div>
                  </div>
                  <div className="mt-8 mb-2 flex justify-between items-center">
                    <span className="text-indigo-500 font-medium">{course.price}</span>
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