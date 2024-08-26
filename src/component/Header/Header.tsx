import { useEffect, useState } from "react";
import styled from "styled-components";

const Header = () => {
  const [userList, setUserList] = useState([0, 0, 0]);

  useEffect(() => {}, []);

  const getUserList = () => {};
  return (
    <HeaderContainer>
      <UserSelector defaultValue={"3"}>
        {userList.map((item, index) => (
          <option key={index} value={index}>
            {index}
          </option>
        ))}
      </UserSelector>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 80px;
`;

const UserSelector = styled.select`
  width: 200px;
  height: 50px;
  border: 1px solid #aaa;
  border-radius: 8px;
  option {
    background: #ffffff;
    height: 50px;
  }
`;

export default Header;
