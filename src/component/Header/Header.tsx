import { useQuery } from "@tanstack/react-query";
import Calendar from "react-calendar";
import AuthAPI, { UserInfo } from "../../api/Auth";
import { useCookies } from "react-cookie";
import { USER_COOKIE_KEY } from "../../constant/constants";
import * as S from "./Header.style";
import Selector from "../Selector/Selector";
import { useEffect, useState } from "react";
import { useTodoStore } from "../../stores/todoStore";
import Portal from "../../Portal";
import Modal from "../../Modal";
import dayjs from "dayjs";
import DaySelector from "./features/DaySelector";

const Header = () => {
  const [userCookie] = useCookies([USER_COOKIE_KEY]);

  const [showCalendar, setShowCalendar] = useState(false);

  const { selectedDate, setSelectedDate, setSelectedUser } = useTodoStore();

  useEffect(() => {
    if (userCookie.user) {
      setSelectedUser(userCookie.user);
    }
  }, [userCookie]);

  const { data } = useQuery({
    queryKey: ["getUsers"],
    queryFn: AuthAPI.getUser,
    refetchOnWindowFocus: false,
    select: (data): { label: string; value: number }[] => {
      return data.map((item: UserInfo) => ({
        label: item.username,
        value: item.id,
      }));
    },
  });

  const onChangeUser = (userInfo: number) => {
    setSelectedUser(userInfo);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const changeSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <S.HeaderContainer>
      <DaySelector
        changeSelectedDate={changeSelectedDate}
        toggleCalendar={toggleCalendar}
        selectedDate={dayjs(selectedDate, "YYYY-MM-DD").toDate()}
      />
      <Selector<number>
        placeholder="사용자 선택"
        defaultValue={userCookie.user}
        options={data || []}
        onChange={onChangeUser}
      />
      {showCalendar && (
        <Portal>
          <Modal
            type="bottom"
            onClickBackDrop={() => setShowCalendar(false)}
            backDropAnimation={false}
          >
            <S.CalendarView>
              <Calendar
                onChange={(value) => {
                  if (typeof value === "object") {
                    setSelectedDate(value as Date);
                    setShowCalendar(false);
                  }
                }}
                value={dayjs(selectedDate, "YYYY-MM-DD").toDate()}
              />
            </S.CalendarView>
          </Modal>
        </Portal>
      )}
    </S.HeaderContainer>
  );
};

export default Header;
