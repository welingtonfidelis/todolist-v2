import moment from "moment";
import { useCallback } from "react";
import {
  FaPen,
  FaRegCircle,
  FaRegCalendarAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { RiRestartFill } from "react-icons/ri";

import { TodoInterface, TodoStatusEnum } from "../../domains/todo";
import { updateTodo } from "../../services/requests";
import { Notification } from "../notification";
import { Col1, Col2, Container, DateTimeContainer, DateTimeContent, Description } from "./style";

interface ItemPropsIterface {
  todo: TodoInterface;

  onEditTodo: () => void;
  onChangeStatusTodo: () => void;
}

export default function TodoItemComponent(props: ItemPropsIterface) {
  const { todo, onEditTodo, onChangeStatusTodo } = props;

  let hasExpiredDate = false;
  if (todo.status === 'doing' && todo.date) {
    const todoDate = moment(todo.date);
    const today = moment();

    hasExpiredDate = today.isAfter(todoDate, "date");
  }

  const handleChangeStatus = useCallback(async (status: TodoStatusEnum) => {
    try {
      await updateTodo({ ...todo, status });

      onChangeStatusTodo();
    } catch (error) {
      Notification({
        type: "error",
        description: "Salvar tarefa",
        message:
          "Houve um erro ao tentar alterar o status da tarefa. Por favor, tente novamente.",
      });
    }
  }, []);

  const StatusIcon = useCallback(() => {
    let icon = (
      <RiRestartFill
        onClick={() => {
          handleChangeStatus(TodoStatusEnum.TODO);
        }}
      />
    );

    if (todo.status === "doing")
      icon = (
        <FaCheckCircle
          onClick={() => {
            handleChangeStatus(TodoStatusEnum.DONE);
          }}
        />
      );
    else if (todo.status === "todo")
      icon = (
        <FaRegCircle
          onClick={() => {
            handleChangeStatus(TodoStatusEnum.DOING);
          }}
        />
      );

    return icon;
  }, []);

  return (
    <Container backgroundColor={todo.color}>
      <Col1>
        <Description>{todo.description}</Description>

        <DateTimeContainer>
            {/* {todo.date && (
              <DateTimeContent hasExpiredDate={hasExpiredDate}>
                <FaRegCalendarAlt />
                <span>
                  {moment(new Date(todo.date)).utc().format("DD/MM/YYYY")}
                </span>
              </DateTimeContent>
            )} */}
            {todo.time && (
              <DateTimeContent hasExpiredDate={false}>
                <FaClock />
                <span>{moment(new Date(todo.time)).format("HH:mm")}</span>
              </DateTimeContent>
            )}
        </DateTimeContainer>
      </Col1>

      <Col2>
        <FaPen onClick={onEditTodo} />
        <StatusIcon />
      </Col2>
    </Container>
  );
}
