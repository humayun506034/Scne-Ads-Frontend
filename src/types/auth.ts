export interface ILoginInput {
  email: string;
  password: string;
}
export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: 'admin' | 'customer';
  organisation_role: string;
  organisation_name: string;
  is_verified: boolean;
}

export interface IRegisterInput {
  // first_name: string;
  // last_name: string;
  // phone: string;
  // email: string;
  // password: string;
  // organisation_name: string;
  // organisation_role: string;
  // profile_image?: File | null;
}


export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}


export interface ISignupData {
  id: string;
  email: string;
  phone: string;
  is_verified: boolean;
}

export interface ILoginResponseData {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IVerifyOtpInput {
  email: string;
  otp: string;
}

export interface IRequestResetPasswordInput {
  email: string;
}


export interface IResetPasswordInput {
  email: string;
  opt: string;
  newPassword: string;
}
