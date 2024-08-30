import { AxiosInstance } from "./api";

type LoginParam = {
  userid: string;
  userpassword: string;
};

type JoinInfo = {
  userid: string;
  password: string;
};

export type UserInfoParam = {
  username: string;
  email: string;
  address1: string;
  address2: string;
  zipcode: string;
};

export type JoinParam = JoinInfo & UserInfoParam;

export type UserInfo = {
  username: string;
  id: number;
};
const AuthAPI = {
  login: (body: LoginParam) => {
    return AxiosInstance.post("/login", body)
      .then((resp) => resp.data)
      .catch(() => {});
  },
  join: (body: JoinParam) => {
    return AxiosInstance.post("/users", body).then((resp) => resp.data);
  },
  getUsers: (): Promise<UserInfo[]> => {
    return AxiosInstance.get("/users").then((resp) => resp.data);
  },
  getUser: (id: number): Promise<UserInfoParam> => {
    const query = new URLSearchParams();
    query.append("id", id.toString());
    return AxiosInstance.get(`/user?${query.toString()}`).then(
      (resp) => resp.data
    );
  },
};

export default AuthAPI;
