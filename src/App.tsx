import TodoList from "./pages/TodoList/TodoList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "./pages/Login/Login";
import Join from "./pages/Join/Join";
import { CookiesProvider } from "react-cookie";
import GlobalStyles from "./styles/gloablStyle";

const queryClient = new QueryClient();

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route element={<Layout />}>
              <Route path="/todo" element={<TodoList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
