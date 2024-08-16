import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  height: 50px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  border-bottom-style: solid;
  margin-bottom: 3px;
`;

export const LeftView = styled.div`
  display: flex;
  flex: 1;
`;
export const ModifyInput = styled.input<{ disabled: boolean }>`
  flex: 1;
  display: flex;
  border: none;
  outline: none;
  border: 1px solid #ddd;
  height: 30px;
  border-radius: 10px;
  padding: 0 15px;
  margin-left: 12px;
  font-size: 14px;
  font-weight: normal;
  ${({ disabled }) =>
    disabled &&
    css`
      border: 1px solid #ffffff;
      background: #ffffff;
    `}
`;
export const TextWrap = styled.p<{ $isDone: boolean }>`
  margin-left: 10px;
  min-width: 300px;
  font-size: 14px;
  font-weight: normal;
  ${({ $isDone }) =>
    $isDone
      ? css`
          color: #ccc;
          text-decoration: line-through;
        `
      : css``}
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  button {
    border-radius: 5px;
    height: 30px;
    width: 50px;
    margin-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #3383fd;
    background: #3383fd;
    color: #ffffff;
  }
`;
