export interface ILoginInput {
  username: string;
  password: string;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  accessToken: string;
  refreshToken: string;
}

