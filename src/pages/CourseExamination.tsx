import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonTitle, IonIcon, IonModal, IonText } from "@ionic/react";
import { arrowBackOutline, enterOutline, closeCircle, checkmarkCircleOutline, readerOutline, push } from "ionicons/icons";

interface Question {
  q_number: number;
  q_statement: string;
  q_field_type: string;
  q_selection: Record<string, string>[];
}

interface Exam {
  courseId: string;
  exam_id: number;
  title: string;
  body: string;
  questions: Question[];
}

const CourseExamination: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [examData, setExamData] = useState<Exam | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const history = useHistory();

  const [showModal, setShowModal] = useState(false); // For controlling the modal visibility
  const [score, setScore] = useState({ correct: 0, total: 10 });

  useEffect(() => {
    import("../exams.json")
      .then((data) => {
        const exams: Exam[] = data.default || data;
        const courseExam = exams.find(
          (exam) => exam.courseId.toUpperCase() === courseId.toUpperCase()
        );
        if (courseExam) setExamData(courseExam);
      })
      .catch((error) => console.error("Error loading exam data:", error));
  }, [courseId]);

  const handleAnswerChange = (qNumber: number, value: string) => {
    console.log('t1')
    setAnswers((prev) => ({ ...prev, [qNumber]: value }));
  };

  const handleSubmit = () => {
    setScore({ correct: 8, total: 10 }); 
    setShowModal(true); 
  };


  if (!examData) return <IonContent>Loading...</IonContent>;

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
          <IonTitle>Course Examination</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent className="ion-padding">
        <div className="text-2xl font-bold py-2">{examData.body}</div>
        
        <div className="space-y-6">
            {examData.questions.map((question) => (
            <div key={question.q_number} className="grid grid-cols-3 gap-4 items-center border-b pb-4">
                {/* Question Section */}
                <div className="col-span-1 font-medium">
                {question.q_number}. {question.q_statement}
                </div>

                <div className="col-span-2">
                <div className="grid grid-cols-2 gap-4">
                    {question.q_selection[0] &&
                    Object.entries(question.q_selection[0]).map(([key, value]) => (
                        <label key={key} className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg cursor-pointer">
                        <input
                            type="radio"
                            name={`question-${question.q_number}`}
                            value={key}
                            checked={answers[question.q_number] === key}
                            onChange={(e) => handleAnswerChange(question.q_number, e.target.value)}
                            className="w-5 h-5"
                        />
                        <span>{value}</span>
                        </label>
                    ))}
                </div>
                </div>
            </div>
            ))}
        </div>

        <div className="mt-6 flex justify-end">
            <button className="px-6 py-2 bg-indigo-700 text-white rounded-lg flex items-center gap-2" onClick={handleSubmit}>
            Submit my answers
            <IonIcon icon={enterOutline} />
            </button>
        </div>

          {/* Result Modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonContent className="ion-padding">
            <div className="text-right">
                <IonIcon size="large" className="p-2 mr-4 rounded-lg cursor-pointer" onClick={() => setShowModal(false)} icon={closeCircle} />
            </div>
            <div className="flex justify-center items-center">
              <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold mb-4">Assessment Result</h2>
                    <div className="text-xl text-gray-800">
                        <IonIcon size="large" className="p-2 mr-4 rounded-lg cursor-pointer text-indigo-600"  icon={checkmarkCircleOutline} />
                      <p className="mb-2">Your Score: <span className="font-bold">{score.correct}/{score.total}</span></p>
                      <p className="mb-4">Percentage: <span className="font-bold">{((score.correct / score.total) * 100).toFixed(2)}%</span></p>

                      <p className="mt-4 mb-4">Congratulations for passing this course examination! 🥳🥳🥳</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <button className="mb-4 px-6 py-2 bg-indigo-700 text-white rounded-lg flex items-center gap-2">
                            <IonIcon icon={readerOutline} />
                            Download Certificate
                        </button>
                    </div>
                </div>
              </div>
            </div>
          </IonContent>
        </IonModal>

        </IonContent>
    </IonPage>
  );
};

export default CourseExamination;