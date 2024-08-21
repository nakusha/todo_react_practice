import { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import styled from "styled-components";
import searchIcon from "./assets/search_outline.png";
import DaySelector from "./DaySelector";
import Calendar from "react-calendar";
import Portal from "./Portal";
import Modal from "./Modal";

import "react-calendar/dist/Calendar.css";
import "./calendar.style.css";
import TodoAPI, { AddTodoItem, TodoItem } from "./api/Todo";
import dayjs from "dayjs";

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

function App() {
  const [list, setList] = useState<TodoItem[]>([]);
  const [searchList, setSearchList] = useState<TodoItem[]>([]);
  const [input, setInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    getTodoListByDate();
  }, [selectedDate]);

  const addTodo = () => {
    if (input.length === 0) return;

    const todo: AddTodoItem = {
      content: input,
      user_id: 3,
      date: selectedDate as Date,
    };

    TodoAPI.addTodo(todo)
      .then((resp) => {
        getTodoListByDate();
        // setList((prevList) => [resp, ...prevList]);
      })
      .catch((e) => console.log(e));
    setInput("");
  };

  const modifyContent = (item: TodoItem, content: string) => {
    item.content = content;
    modifyListItem(item);
  };

  const completeTodo = (item: TodoItem, isComplete: boolean) => {
    item.completed = isComplete;
    console.log(item);
    modifyListItem(item);
  };
  const modifyListItem = (modifyItem: TodoItem) => {
    TodoAPI.modifyTodo(modifyItem).then(() => {
      getTodoListByDate();
      // setList(
      //   list.map((item) => {
      //     if (item.id === modifyItem.id) {
      //       console.log("skjfhskjhd", modifyItem);
      //       item = modifyItem;
      //     }
      //     return item;
      //   })
      // );
    });
  };
  const deleteListItem = (id: number) => {
    TodoAPI.deleteTodo(id).then(() => {
      getTodoListByDate();
      // setList(list.filter((item) => item.id !== id));
    });
  };

  const toggleSearchMode = () => {
    if (isSearch) {
      getTodoListByDate();
    }
    setIsSearch(!isSearch);
    setInput("");
  };

  const searchListbyKeyword = () => {
    TodoAPI.searchTodos(input).then((resp) => {
      setList(resp);
    });
    // const result = list.filter((item) => item.content.includes(input));
    // setSearchList(result);
  };

  const getTodoListByDate = () => {
    TodoAPI.getTodos(3, dayjs(selectedDate as Date).format("YYYY-MM-DD")).then(
      (resp) => {
        setList(resp);
      }
    );
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const changeSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };
  return (
    <>
      <Container>
        {!isSearch ? (
          <DaySelector
            changeSelectedDate={changeSelectedDate}
            toggleCalendar={toggleCalendar}
            selectedDate={selectedDate as Date}
          />
        ) : (
          <div style={{ height: 60 }}></div>
        )}

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
        {list.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            deleteListItem={deleteListItem}
            modifyListItem={modifyContent}
            completeTodo={completeTodo}
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
                  if (typeof value === "object") {
                    setSelectedDate(value);
                    setShowCalendar(false);
                    setIsSearch(false);
                  }
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
