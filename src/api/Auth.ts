import { AxiosInstance } from "./api";

type LoginParam = {
  userid: string;
  userpassword: string;
};
export type JoinParam = LoginParam & {
  username: string;
  email: string;
  address1: string;
  address2: string;
  zipcode: string;
};

type UserInfo = {
  username: string;
  id: number;
};
const AuthAPI = {
  login: (body: LoginParam) => {
    console.log(body);
    return AxiosInstance.post("/login", body).then((resp) => resp.data);
  },
  join: (body: JoinParam) => {
    return AxiosInstance.post("/users", body);
  },
  getUser: (): Promise<UserInfo[]> => {
    return AxiosInstance.get("/users");
  },
};

export default AuthAPI;
