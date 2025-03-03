import { supabase } from "./supabaseClient";

export const saveExamResult = async (
  examTitle: string,
  userId: string,
  examId: number,
  totalQuestion: number,
  results: number
) => {
  const { data, error } = await supabase.from("examResults").insert([
    {
      exam_title: examTitle,
      user_id: userId,
      exam_id: examId,
      total_question: totalQuestion,
      results: results,
    },
  ]);

  return { data, error };
};
