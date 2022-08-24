import { Radio } from "antd";
import styled from "styled-components";

export const Container = styled.div``;

export const ColorCardContainer = styled.div``;

export const ColorCardItem = styled(Radio)<{ color: string }>`
  background: ${(props) => `#${props.color}`};
  border-radius: 4px;
  height: 2.5rem;
  width: 2.5rem;
`;

export const DateTimeContainer = styled.div`
  display: flex;
  flex-direction: column;

  & .ant-form-item {
    width: 100%;
  }

  & .ant-form-item:first-child {
    margin-right: 8px;
  }

  @media (min-width: 601px) {
    flex-direction: row;
  }
`;
