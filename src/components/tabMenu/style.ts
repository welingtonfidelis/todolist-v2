import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 16px 0;
`;

export const Option = styled.span<{ selected: boolean }>`
  padding: 4px 12px;
  transition: color 0.5s;

  ${(props) => {
    if (props.selected) {
      return css`
        font-weight: 700;
        color: var(--color-secondary);
        border: 1px solid var(--color-secondary);
        border-radius: 16px;
      `;
    }
  }}

  &:hover {
    cursor: pointer;
    color: var(--color-secondary);
  }
`;
