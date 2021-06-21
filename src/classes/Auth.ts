export type User = {
  id: number;
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  isVerified: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LoginFields = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type RegisterFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export type VerifyFields = {
  code: string;
};

export type ResetResendFields = {
  email: string;
};
