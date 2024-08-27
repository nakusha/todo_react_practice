import { create } from "zustand";
import { UserInfoParam } from "../api/Auth";

type State = {
  userInfo: UserInfoParam | null;
};

type Actions = {
  setUserInfo: (userInfo: UserInfoParam) => void;
};

export const userStore = create<State & Actions>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: UserInfoParam) => set({ userInfo }),
}));
