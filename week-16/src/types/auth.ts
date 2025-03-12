export interface IRegisterReq {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export interface ILoginReq {
  email: string;
  password: string;
}
