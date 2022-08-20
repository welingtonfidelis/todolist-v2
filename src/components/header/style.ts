import styled from "styled-components";

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  padding-bottom: 4px;
  height: 44px;
  border-bottom: 1px solid var(--color-primary);

  @media (min-width: 601px) {
    justify-content: flex-end;

    & span {
      margin-right: 12px;
    }
  }
`;
