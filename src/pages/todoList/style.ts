import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NewTodoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;

  & > span {
    font-size: 1.3rem;
    width: 60%;
  }
`;

export const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(100vh - 200px);
  overflow: auto;
`;

export const TodoGroupItemsTitle = styled.span`
  font-size: 1rem;
  font-weight: 500;

  & svg {
    margin-right: 4px;
  }
`;

export const TodoListContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TodoListGroupItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
