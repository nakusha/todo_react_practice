import styled from "styled-components";

export const JoinContainer = styled.form`
  width: 400px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #aaa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 50px;
`;

export const NoMBRowItem = styled.div`
  height: 40px;
  display: flex;
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 10px;
`;
export const RowItem = styled(NoMBRowItem)`
  margin-bottom: 20px;
  span {
    color: red;
  }
`;

export const ErrorRow = styled.div`
  margin-bottom: 10px;
  span {
    color: red;
  }
`;

export const RowLeftItem = styled.div`
  width: 100px;
  height: 50px;
  display: flex;
  align-items: center;
`;
export const RowRightItem = styled.div`
  display: flex;
  flex: 1;

  input {
    height: 30px;
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0px;
    padding: 0 10px;
  }

  button {
    margin-left: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background: #ccc;
  }
`;

export const Button = styled.button`
  display: flex;
  flex: 1;
  background: #ccc;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  height: 30px;
`;
