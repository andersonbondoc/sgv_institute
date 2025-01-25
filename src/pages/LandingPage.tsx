import React from "react";
import { useHistory } from "react-router-dom";
import { IonContent, IonPage, IonButton, IonIcon, IonSearchbar } from "@ionic/react";
import { arrowForwardCircleOutline } from "ionicons/icons"; 



const LandingPage = () => {

    const history = useHistory();

    const handleTakeCourse = (courseId: string) => {
        history.push(`/course/${courseId}`);
    };

    const courses = [
        {
            id: 1,
            courseCode: "PMFIDS",
            title: "Project Management Fundamentals for Implementation of Digital Solutions",
            description: "Master the art of managing complex projects efficiently.",
            price: "Free",
            icon: "/assets/icon-project-management.svg",
            bgColor: "bg-blue-100",
        },
        {
            id: 2,
            courseCode: "DS100",
            title: "Data Security",
            description: "Learn techniques to secure sensitive data in modern systems.",
            price: "Free",
            icon: "/assets/icon-data-security.svg",
            bgColor: "bg-green-100",
        },
        {
            id: 3,
            courseCode: "DP100",
            title: "Data Privacy",
            description: "Understand the principles of data privacy and compliance.",
            price: "Free",
            icon: "/assets/icon-data-privacy.svg",
            bgColor: "bg-yellow-100",
        },
        {
            id: 4,
            courseCode: "CM100",
            title: "Change Management",
            description: "Develop skills to manage and lead organizational changes.",
            price: "Free",
            icon: "/assets/icon-change-management.svg",
            bgColor: "bg-pink-100",
        },
        {
            id: 5,
            courseCode: "DG100",
            title: "Data Governance",
            description: "Discover how to establish effective data governance policies.",
            price: "Free",
            icon: "/assets/icon-data-governance.svg",
            bgColor: "bg-purple-100",
        },
    ];

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
            <h2 className="text-3xl font-bold text-gray-900">SGV Institute</h2>
            <p className="text-gray-700">
              SGV Institute offers a variety of courses to elevate your skills and knowledge.
            </p>
          </div>

      
          <div className="w-full max-w-md">
            <IonSearchbar placeholder="Search courses..." className="mb-4"></IonSearchbar>
          </div>

 
          <div className="w-full max-w-4xl space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Recommended Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div key={course.id} className="bg-white p-4 rounded-lg shadow-lg">
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
                      <h4 className="text-lg font-medium text-gray-800">{course.title}</h4>
                      <p className="text-sm text-gray-600">{course.description}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-700">{course.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-indigo-500 font-medium">{course.price}</span>
                    <IonButton
                    className="text-sm px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md flex items-center space-x-2"
                    fill="clear"
                    onClick={() => handleTakeCourse(course.courseCode)}
                    >
                        <span>Take Course</span>
                        <IonIcon icon={arrowForwardCircleOutline} size="small"></IonIcon>
                    </IonButton>
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