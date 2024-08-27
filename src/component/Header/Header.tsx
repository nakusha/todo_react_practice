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
import "react-calendar/dist/Calendar.css";
import "./calendar.style.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [userCookie, setUserCookie, removeUserCookie] = useCookies([
    USER_COOKIE_KEY,
  ]);

  const [showCalendar, setShowCalendar] = useState(false);

  const { selectedDate, selectedUser, setSelectedDate, setSelectedUser } =
    useTodoStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userCookie.user) {
      console.log(userCookie.user);
      setSelectedUser(userCookie.user);
    }
  }, [userCookie]);

  const { data } = useQuery({
    queryKey: ["getUsers"],
    queryFn: AuthAPI.getUsers,
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
        defaultValue={selectedUser}
        options={data || []}
        onChange={onChangeUser}
      />
      <Button
        onClick={() => {
          removeUserCookie(USER_COOKIE_KEY);
          navigate("/");
        }}
      >
        로그아웃
      </Button>
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

const Button = styled.button`
  border-radius: 5px;
  height: 40px;
  width: 70px;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #3383fd;
  background: #3383fd;
  color: #ffffff;
`;
export default Header;
