export type AccountType = {
  id: number;
  email: string;
  username: string;
  role: string;
  createdAt: number;
};

export type CreateAccountType = {
  email: string;
  username: string;
  role: string;
  password: string;
};
