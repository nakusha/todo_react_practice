import styled from "styled-components";
import Header from "../component/Header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
export default Layout;
