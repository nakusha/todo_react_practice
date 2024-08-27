import { useEffect, useState } from "react";
import ListItem from "./features/ListItem";
import styled from "styled-components";
import searchIcon from "../../assets/search_outline.png";

import { useCookies } from "react-cookie";

import TodoAPI, { AddTodoItem, TodoItem } from "../../api/Todo";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { USER_COOKIE_KEY } from "../../constant/constants";
import { useNavigate } from "react-router-dom";
import { useTodoStore } from "../../stores/todoStore";

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

const TodoList = () => {
  const [userCookie] = useCookies([USER_COOKIE_KEY]);
  const [input, setInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const { selectedDate, selectedUser } = useTodoStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userCookie.user) {
      navigate("/");
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["getTodo", selectedDate, selectedUser],
    queryFn: () => {
      return TodoAPI.getTodos(
        selectedUser ? selectedUser.toString() : userCookie.user,
        selectedDate
      );
    },
  });

  const { data: searchData } = useQuery({
    queryKey: ["searchTodo", input, selectedDate],
    queryFn: () => {
      return TodoAPI.searchTodos(
        input,
        selectedUser ? selectedUser.toString() : userCookie.user,
        selectedDate
      );
    },
    enabled: isSearch && input.length > 0,
  });

  const addTodoMutaion = useMutation({
    mutationFn: (todo: AddTodoItem) => TodoAPI.addTodo(todo),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["getTodo", selectedDate],
      });
    },
  });

  const modifyTodoMutaion = useMutation({
    mutationFn: (todo: TodoItem) => TodoAPI.modifyTodo(todo),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["getTodo", selectedDate],
      });
    },
  });

  const deleteTodoMutaion = useMutation({
    mutationFn: (todoId: number) => TodoAPI.deleteTodo(todoId, userCookie.user),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["getTodo", selectedDate],
      });
    },
  });

  const addTodo = () => {
    if (input.length === 0) return;

    const todo: AddTodoItem = {
      content: input,
      user_id: userCookie.user,
      date: dayjs(selectedDate, "YYYY-MM-DD").toDate(),
    };
    addTodoMutaion.mutate(todo);

    setInput("");
  };

  const modifyContent = (item: TodoItem, content: string) => {
    item.content = content;
    modifyListItem(item);
  };

  const completeTodo = (item: TodoItem, isComplete: boolean) => {
    item.completed = isComplete;
    modifyListItem(item);
  };

  const modifyListItem = (modifyItem: TodoItem) => {
    modifyTodoMutaion.mutate(modifyItem);
  };
  const deleteListItem = (id: number) => {
    deleteTodoMutaion.mutate(id);
  };

  const toggleSearchMode = () => {
    setIsSearch(!isSearch);
    setInput("");
  };

  const displayData = isSearch ? searchData : data;

  return (
    <>
      <Container>
        <AddTodoView>
          <SearchButton onClick={toggleSearchMode}>
            <SearchIcon src={searchIcon} />
          </SearchButton>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          {isSearch ? <></> : <Button onClick={addTodo}>추가</Button>}
        </AddTodoView>
        {displayData?.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            deleteListItem={deleteListItem}
            modifyListItem={modifyContent}
            completeTodo={completeTodo}
          />
        ))}
      </Container>
    </>
  );
};

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

export default TodoList;
