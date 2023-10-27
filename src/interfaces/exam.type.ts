import { QuestionType } from "./question.type";

export type ExamType = {
  id: number;
  name: string;
  questions?: QuestionType[];
  type?: "a" | "b1" | "b2" | "c" | "def";
  questionId: number[];
  score?:
    | {
        correct: number;
        total: number;
      }
    | number;
  isFailAtRequire?: boolean;
};

export type GetExamparam = {
  type: string;
  search: string;
};
