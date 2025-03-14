import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IonCard, IonCardContent } from "@ionic/react";
import CourseContentSection from "./CourseContentSections";

const CourseContentComponent: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { courseId } = useParams<{ courseId: string }>();
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    fetch("/courseList.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch course list");
        }
        return response.json();
      })
      .then((data) => {
        const course = data[courseId];
        if (course && course.modules) {
          console.log("course: ", course);
          setModules(course.modules);
        } else {
          console.warn(`No modules found for course ${courseId}`);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course list:", error);
        setLoading(false);
      });
  }, [courseId]);

  const handleTakeExam = () => {
    history.push(`/course/${courseId}/exam`);
    window.location.reload();
  };

  const handleSelectedModule = (module: any, moduleId: any) => {
    setSelectedModule(module.moduleId);

    const savedPage = localStorage.getItem(`currentPage-${moduleId}`);
    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4">
        <p>Loading modules...</p>
      </div>
    );
  }

  if (!loading && modules.length === 0) {
    return (
      <div className="min-h-screen p-4">
        <p>No modules available for this course.</p>
      </div>
    );
  }

  return (
    <div>
      {!selectedModule ? (
        <div className="space-y-6 p-4">
          {modules.map((module, index) => {
            const savedPMFIDS_BCM = parseInt(
              localStorage.getItem("currentPage-PMFIDS_BCM") || "0"
            );
            const savedPMFIDS_RISK = parseInt(
              localStorage.getItem("currentPage-PMFIDS_RISK") || "0"
            );
            const savedPMFIDS_PM = parseInt(
              localStorage.getItem("currentPage-PMFIDS_PM") || "0"
            );
            const countPMFIDS_BCM = parseInt(
              localStorage.getItem("sectionlength-PMFIDS_BCM") || "0"
            );
            const countPMFIDS_RISK = parseInt(
              localStorage.getItem("sectionlength-PMFIDS_RISK") || "0"
            );
            const countPMFIDS_PM = parseInt(
              localStorage.getItem("sectionlength-PMFIDS_PM") || "0"
            );
            const completionPercentage_PMFIDS_PM =
              countPMFIDS_PM !== 0
                ? (savedPMFIDS_PM / countPMFIDS_PM) * 100
                : 0;
            const completionPercentage_PMFIDS_RISK =
              countPMFIDS_RISK !== 0
                ? (savedPMFIDS_RISK / countPMFIDS_RISK) * 100
                : 0;
            const completionPercentage_PMFIDS_BCM =
              countPMFIDS_BCM !== 0
                ? (savedPMFIDS_BCM / countPMFIDS_BCM) * 100
                : 0;
            const moduleCompletion =
              module.moduleId === "PMFIDS_BCM"
                ? completionPercentage_PMFIDS_BCM
                : module.moduleId === "PMFIDS_RISK"
                ? completionPercentage_PMFIDS_RISK
                : module.moduleId === "PMFIDS_PM"
                ? completionPercentage_PMFIDS_PM
                : 0;
            return (
              <IonCard
                key={module.moduleId}
                onClick={() => handleSelectedModule(module, module.moduleId)}
                className={`bg-slate-100 cursor-pointer hover:shadow-xl transition duration-300 rounded-lg relative`}
              >
                <IonCardContent className="flex items-center space-x-4">
                  <img
                    src={module.icon}
                    alt={module.title}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {module.title}
                    </div>
                    <div className="text-xl mt-4 text-stone-700">
                      {module.description}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-32 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span
                      className={`text-sm font-semibold ${
                        moduleCompletion === 100
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {moduleCompletion === 100 ? "Complete" : "Incomplete"} (
                      {Math.round(moduleCompletion)}%)
                    </span>
                  </div>
                </IonCardContent>
              </IonCard>
            );
          })}
        </div>
      ) : (
        <CourseContentSection
          moduleId={selectedModule}
          onBackToModules={() => setSelectedModule(null)}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default CourseContentComponent;
