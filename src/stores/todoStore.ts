import dayjs from "dayjs";
import { create } from "zustand";

type State = {
  selectedDate: string;
  selectedUser: number;
};

type Actions = {
  setSelectedDate: (date: Date) => void;
  setSelectedUser: (selectedUser: number) => void;
};

export const useTodoStore = create<State & Actions>((set) => ({
  selectedDate: dayjs().format("YYYY-MM-DD"),
  selectedUser: -1,

  setSelectedDate: (date: Date) => {
    const selectedDate = dayjs(date).format("YYYY-MM-DD");
    return set({ selectedDate });
  },
  setSelectedUser: (selectedUser: number) => set({ selectedUser }),
}));
