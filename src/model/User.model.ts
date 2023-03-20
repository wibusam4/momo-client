export interface Account {
  id: string;
  name: string;
  username: string;
  role: string;
  money?: number;
  status: string;
  limit?: string;
}

export interface FormSignup {
  name: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export interface FormSignin {
  username: string;
  password: string;
}

export interface FormChangePass {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
