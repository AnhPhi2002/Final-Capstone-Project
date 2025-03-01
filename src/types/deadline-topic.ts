export type SubmissionRound = {
  id: string;
  semester_id: string;
  round_number: number;
  start_date: string;
  end_date: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  description: string;
  status: "PENDING" | "ACTIVE" | "COMPLETE";
};
