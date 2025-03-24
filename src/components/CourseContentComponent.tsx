import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IonButton, IonCard, IonCardContent } from "@ionic/react";
import CourseContentSection from "./CourseContentSections";
import CertificateEditor from "./CertificateEditor";
import { supabase } from "../queries/supabaseClient"; // Adjust the import path as needed

const CourseContentComponent: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { courseId } = useParams<{ courseId: string }>();
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [getFullName, setFullName] = useState<string>("");
  const [getOrganization, setOrganization] = useState<string>("");
  const [getCourse, setCourse] = useState<string>("");
  const [getModule, setModuleLessons] = useState<string[]>([]);
  const [getBanks, setBanks] = useState<string[]>([]);
  const [getModuleId, setModulesId] = useState<string[]>([]);
  const [savedProgress, setSavedProgress] = useState<Record<string, number>>(
    {}
  );
  const [totalSections, setTotalSections] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      console.error("User not found");
      return;
    }
    const user = JSON.parse(storedUser);
    setFullName(`${user.firstname} ${user.lastname} - ${user.role}`);
    setOrganization(`${user.organizationname}`);
  }, []);

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
        setCourse(course.title);
        if (course && course.modules) {
          setModules(course.modules);
          const moduleIds = course.modules.map(
            (module: any) => module.moduleId
          );
          setModulesId(moduleIds);
          setModuleLessons(course.modules.map((row: any) => row.title));
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

  useEffect(() => {
    const fetchProgressData = async () => {
      console.log("initiate");
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        console.error("User not found");
        return;
      }
      const user = JSON.parse(storedUser);

      const { data, error } = await supabase
        .from("user_progress")
        .select("module_id, current_page, total_pages")
        .eq("user_id", user.userid)
        .in("module_id", getModuleId);

      if (error) {
        console.error("Error fetching progress data:", error);
        return;
      }

      const progressMap: Record<string, number> = {};
      const sectionsMap: Record<string, number> = {};
      getModuleId.forEach((id) => {
        progressMap[id] = 0;
        sectionsMap[id] = 0;
      });

      data.forEach((item) => {
        progressMap[item.module_id] = item.current_page || 0;
        sectionsMap[item.module_id] = item.total_pages || 0;
      });

      setSavedProgress(progressMap);
      setTotalSections(sectionsMap);
    };

    if (getModuleId.length > 0) {
      fetchProgressData();
    }
  }, [getModuleId, courseId, selectedModule]);

  const handleTakeExam = () => {
    history.push(`/course/${courseId}/exam`);
    window.location.reload();
  };

  // When a module is selected, fetch its progress and set up a realtime subscription
  const handleSelectedModule = async (
    module: any,
    moduleId: any,
    index: number
  ) => {
    if (index > 0) {
      const prevModuleId = getModuleId[index - 1];
      const prevModuleCompletion =
        totalSections[prevModuleId] !== 0
          ? (savedProgress[prevModuleId] / totalSections[prevModuleId]) * 100
          : 0;
      if (prevModuleCompletion < 100) {
        alert("Complete the previous module first!");
        return;
      }
    }
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const user = JSON.parse(storedUser);

    // Fetch progress from Supabase
    const { data, error } = await supabase
      .from("user_progress")
      .select("current_page")
      .eq("user_id", user.userid)
      .eq("module_id", moduleId)
      .single();

    let progress = 0;
    if (error || !data) {
      // Optionally, insert a new row if not found
      const { error: insertError } = await supabase
        .from("user_progress")
        .insert({ user_id: user.userid, module_id: moduleId, current_page: 0 });
      if (insertError) {
        console.error("Error inserting progress:", insertError);
      }
    } else {
      progress = data.current_page;
    }

    setCurrentPage(progress);
    setSelectedModule(module.moduleId);
  };

  const completionPercentages = getModuleId.reduce((acc, id) => {
    acc[id] =
      totalSections[id] !== 0
        ? (savedProgress[id] / totalSections[id]) * 100
        : 0;
    return acc;
  }, {} as Record<string, number>);

  const isCertificateEnabled = modules.every(
    (module) =>
      totalSections[module.moduleId] !== 0 &&
      (savedProgress[module.moduleId] / totalSections[module.moduleId]) *
        100 ===
        100
  );

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
            const moduleCompletion =
              totalSections[module.moduleId] !== 0
                ? (savedProgress[module.moduleId] /
                    totalSections[module.moduleId]) *
                  100
                : 0;
            return (
              <IonCard
                key={module.moduleId}
                onClick={() => {
                  // Always enable the first module
                  if (
                    index === 0 ||
                    completionPercentages[getModuleId[index - 1]] === 100
                  ) {
                    handleSelectedModule(module, module.moduleId, index);
                  }
                }}
                className={`bg-slate-100 transition duration-300 rounded-lg relative ${
                  index === 0 ||
                  completionPercentages[getModuleId[index - 1]] === 100
                    ? "cursor-pointer hover:shadow-xl"
                    : "cursor-not-allowed opacity-50"
                }`}
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
          {isCertificateEnabled && (
            <CertificateEditor
              name={getFullName}
              ruralBankName={getOrganization}
              wblTitle={getCourse}
              lessons={getModule}
              isCertificateEnabled={isCertificateEnabled}
            />
          )}
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
