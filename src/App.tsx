import TodoList from "./pages/TodoList/TodoList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      x<TodoList />
    </QueryClientProvider>
  );
}

export default App;
