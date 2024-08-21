import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Test from "./test";

type Props = {
  getTodoListByDate: (date: string) => void;
  toggleCalendar: () => void;
  selectedDate: Date;
};

const DaySelector = ({
  selectedDate,
  getTodoListByDate,
  toggleCalendar,
}: Props) => {
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    setDate(dayjs(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    getTodoListByDate(date.format("YYYY-MM-DD"));
  }, [date]);

  const onChangeDate = (isPrev: boolean) => {
    if (isPrev) {
      setDate(date.add(-1, "days"));
    } else {
      setDate(date.add(1, "days"));
    }
  };

  return (
    <Container>
      <ArrowButton onClick={() => onChangeDate(true)}>&lt;</ArrowButton>
      <DayTextWrap onClick={toggleCalendar}>
        {dayjs(date).format("YYYY-MM-DD")}
      </DayTextWrap>
      <ArrowButton onClick={() => onChangeDate(false)}>&gt;</ArrowButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  flex: 1;

  padding: 0 20px;
  margin-bottom: 10px;
`;

const ArrowButton = styled.button`
  width: 40px;
  height: 40px;
  background: #ffffff;
  font-size: 30px;
  color: #bbb;
  border: 1px solid #bbb;
  border-radius: 5px;
`;

const DayTextWrap = styled.p`
  padding: 0px;
  display: flex;
  flex: 1;
  margin: 0 20px;
  justify-content: center;
`;
export default DaySelector;
