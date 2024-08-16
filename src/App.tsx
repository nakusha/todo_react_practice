import { useRef, useState } from "react";
import ListItem from "./ListItem";
import styled from "styled-components";
import searchIcon from "./assets/search_outline.png";
import DaySelector from "./DaySelector";
import Calendar from "react-calendar";
import Portal from "./Portal";
import Modal from "./Modal";

import "react-calendar/dist/Calendar.css";
import "./calendar.style.css";

export type ListItemType = {
  content: string;
  id: number;
};

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

function App() {
  const [list, setList] = useState<ListItemType[]>([]);
  const [searchList, setSearchList] = useState<ListItemType[]>([]);
  const [input, setInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const count = useRef(0);

  const addTodo = () => {
    const todo = {
      id: count.current,
      content: input,
    };
    count.current++;

    setInput("");
    setList((prev) => [todo, ...prev]);
  };

  const modifyListItem = (id: number, content: string) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          item.content = content;
        }
        return item;
      })
    );
  };
  const deleteListItem = (id: number) => {
    setList(list.filter((item) => item.id !== id));
  };

  const toggleSearchMode = () => {
    if (isSearch) {
      setSearchList([]);
    }
    setIsSearch(!isSearch);
    setInput("");
  };

  const searchListbyKeyword = () => {
    const result = list.filter((item) => item.content.includes(input));
    setSearchList(result);
  };

  const getTodoListByDate = () => {};

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <>
      <Container>
        <DaySelector
          getTodoListByDate={getTodoListByDate}
          toggleCalendar={toggleCalendar}
          selectedDate={selectedDate}
        />

        <AddTodoView>
          <SearchButton onClick={toggleSearchMode}>
            <SearchIcon src={searchIcon} />
          </SearchButton>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => {
              if (isSearch) {
                if (e.key === "Enter") {
                  searchListbyKeyword();
                }
              }
            }}
          />
          {isSearch ? (
            <Button onClick={searchListbyKeyword}>검색</Button>
          ) : (
            <Button onClick={addTodo}>추가</Button>
          )}
        </AddTodoView>
        {searchList.length === 0
          ? list.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                deleteListItem={deleteListItem}
                modifyListItem={modifyListItem}
              />
            ))
          : searchList.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                deleteListItem={deleteListItem}
                modifyListItem={modifyListItem}
              />
            ))}
      </Container>
      {showCalendar && (
        <Portal>
          <Modal
            type="bottom"
            onClickBackDrop={() => setShowCalendar(false)}
            backDropAnimation={false}
          >
            <CalendarView>
              <Calendar
                onChange={(value) => {
                  setSelectedDate(value);
                  setShowCalendar(false);
                }}
                value={selectedDate}
              />
            </CalendarView>
          </Modal>
        </Portal>
      )}
    </>
  );
}

const Container = styled.div``;

const AddTodoView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  flex: 1;
  margin-bottom: 20px;
`;

const SearchButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SearchIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  padding: 0px;
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  border-bottom-style: solid;
  margin-right: 20px;
  padding: 0 15px;

  outline: none;
`;

const CalendarView = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: #ffffff;
`;
const Button = styled.button`
  border-radius: 5px;
  height: 40px;
  width: 60px;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #3383fd;
  background: #3383fd;
  color: #ffffff;
`;

export default App;
