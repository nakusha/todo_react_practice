import styled, { css } from "styled-components";

export const SelectContainer = styled.div<{ width?: string }>`
  position: relative;
  min-width: 200px;
  width: ${({ width }) => width + "px" || "200px"};
`;

export const Selector = styled.div<{ $selectedOption: any }>`
  border: 1px solid #ccc;
  padding: 10px;
  min-height: 40px;
  cursor: pointer;
  background-color: white;
  &:hover {
    background-color: #f8f8f8;
  }
  ${({ $selectedOption }) =>
    $selectedOption
      ? css``
      : css`
          color: #ccc;
        `}
`;

export const OptionContainer = styled.ul`
  position: absolute;
  width: 100%;
  border: 1px solid #ccc;
  border-top: none;
  margin-top: -1px;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  z-index: 1;
`;
export const Option = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
