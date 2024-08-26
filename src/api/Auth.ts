import { AxiosInstance } from "./api";

type LoginParam = {
  userid: string;
  password: string;
};
type JoinParam = LoginParam & {
  email: string;
  address1: string;
  address2: string;
  zipcode: string;
};
const AuthAPI = {
  login: (body: LoginParam) => {
    return AxiosInstance.post("", body);
  },
  join: (body: JoinParam) => {
    return AxiosInstance.post("", body);
  },
  getUser: () => {
    return AxiosInstance.get("");
  },
};

export default AuthAPI;
