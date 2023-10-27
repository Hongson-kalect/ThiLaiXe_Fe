import { ExamType } from "./exam.type";
import { UserProfileType } from "./profile.type";

export type RecordType = {
  id: number;
  email: string;
  examId?: number;
  examType?: number;
  ansers: number[];
  score: number;
  user?: UserProfileType;
  exam?: ExamType;
  createdAt: number;
};
