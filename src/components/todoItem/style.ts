import styled from "styled-components";

export const Container = styled.div<{ backgroundColor: string }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  background: #${(props) => props.backgroundColor};

  @media (min-width: 601px) {
      width: calc(98% / 2);
  }

  @media (min-width: 901px) {
      width: calc(98% / 3);
  }
`;

export const Col1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 50px;

  & svg {
    margin-right: 4px;
  }
`;

export const Description = styled.span`
  margin: 0 8px 12px 0;
  font-weight: 500;
  flex: 1;
  white-space: pre-line;
`;

export const DateTimeContent = styled.div<{hasExpiredDate: boolean}>`
  display: flex;
  align-items: center;
  color: ${(props) => props.hasExpiredDate ? 'var(--color-error)' : ''};
`;

export const DateTimeContainer = styled.span`
  display: flex;
  flex-direction: row;
  margin-right: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;

  & ${DateTimeContent}:first-child {
    margin-right: 8px;
  }
`;

export const Col2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & svg {
    font-size: 1.1rem;
    transition: 0.5s;
  }

  & svg:hover {
    cursor: pointer;
    color: var(--color-secondary);
  }
`;
