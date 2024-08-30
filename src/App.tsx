import TodoList from "./pages/TodoList/TodoList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "./pages/Login/Login";
import Join from "./pages/Join/Join";
import { CookiesProvider, useCookies } from "react-cookie";
import GlobalStyles from "./styles/gloablStyle";
import { ThemeProvider } from "styled-components";
import * as Theme from "./styles/theme";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [themeCookie, setThemeCookie] = useCookies(["theme"]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  useEffect(() => {
    if (themeCookie.theme) {
      if (themeCookie.theme === "dark") {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    } else {
      if (darkModeMediaQuery) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    }
  });
  console.log("sdlhfksdhfksj", isDarkMode);
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDarkMode ? Theme.darkMode : Theme.lightMode}>
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
        </ThemeProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
