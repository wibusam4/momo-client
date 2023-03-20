export interface FormOtp {
  phone: string;
  password?: string;
  otp?: string;
}

export interface FormMomo {
  phone: string;
  password: string;
  otp: string;
}

export interface Momo {
  _id: string;
  phone: string;
  name: string;
  timeLogin: number;
  balance: string;
}
