export type QuestionType = {
  id: number;
  title: string;
  image?: string;
  ansers: string[];
  correct?: number;
  explain?: string;
  a1?: boolean;
  a2?: boolean;
  a3a4?: boolean;
  b1?: boolean;
  b2cdef?: boolean;
  require?: boolean;
  type?: string;
  createdAt?: string;
};

export type CreateQuestionParams = {
  ansers: string[];
  correct: number;
  title: string;
  explain: string;
  image: string;
  a1: boolean;
  a2: boolean;
  a3a4: boolean;
  b1: boolean;
  b2cdef: boolean;
  require: boolean;
  type: string;
};

export type getQuestionParams = {
  getAll?: boolean;
  require?: boolean;
  page?: number;
  search?: string;
  type?: string;
  for?: string;
};
