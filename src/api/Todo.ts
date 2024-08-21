import { AxiosInstance } from "./api";

export type AddTodoItem = {
  content: string;
  user_id: number;
  date: Date;
};

export type TodoItem = AddTodoItem & {
  id: number;

  completed: boolean;
};
const TodoAPI = {
  addTodo: (body: AddTodoItem): Promise<TodoItem> => {
    return AxiosInstance.post("/todos", body)
      .then((resp) => {
        return resp.data;
      })
      .catch((e) => console.log(e));
  },
  getTodos: (user_id: number, date?: string): Promise<TodoItem[]> => {
    const query = new URLSearchParams();
    query.append("user_id", user_id.toString());
    if (date) {
      query.append("date", date);
    }
    return AxiosInstance.get(`/todos?${query.toString()}`)
      .then((resp) => {
        return resp.data;
      })
      .catch((e) => console.log(e));
  },
  modifyTodo: (item: TodoItem): Promise<TodoItem> => {
    return AxiosInstance.put("/todos", item)
      .then((resp) => {
        return resp.data;
      })
      .catch((e) => console.log(e));
  },
  deleteTodo: (id: number): Promise<void> => {
    const query = new URLSearchParams();
    query.append("id", id.toString());
    query.append("user_id", "3");

    return AxiosInstance.delete(`/todos?${query.toString()}`);
  },
  searchTodos: (keyword: string): Promise<TodoItem[]> => {
    const query = new URLSearchParams();
    query.append("q", keyword);
    query.append("user_id", "3");
    return AxiosInstance.get(`/todos/search?${query.toString()}`)
      .then((resp) => {
        return resp.data;
      })
      .catch((e) => console.log(e));
  },
};

export default TodoAPI;
