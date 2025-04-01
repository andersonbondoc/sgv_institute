import { supabase } from "./supabaseClient";

export const saveExamResult = async (
  examTitle: string,
  userId: string,
  examId: number,
  score: number,
  totalQuestion: number,
  results: number,
  moduleId: string
) => {
  const { data, error } = await supabase.from("examResults").insert([
    {
      exam_title: examTitle,
      user_id: userId,
      exam_id: examId,
      score: score,
      total_question: totalQuestion,
      results: results,
      end_exam: new Date().toISOString(),
      module_id: moduleId,
    },
  ]);

  return { data, error };
};
