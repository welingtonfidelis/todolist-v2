import moment from "moment";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  FaPen,
  FaRegCircle,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { RiRestartFill } from "react-icons/ri";

import { TodoInterface, TodoStatusEnum } from "../../domains/todo";
import { updateTodo } from "../../services/requests";
import { Notification } from "../notification";
import {
  Col1,
  Col2,
  Container,
  DateTimeContainer,
  DateTimeContent,
  Description,
} from "./style";

interface ItemPropsIterface {
  todo: TodoInterface;

  onEditTodo: () => void;
  onChangeStatusTodo: () => void;
}

export default function TodoItemComponent(props: ItemPropsIterface) {
  const { todo, onEditTodo, onChangeStatusTodo } = props;
  const { t } = useTranslation();

  const handleChangeStatus = useCallback(async (status: TodoStatusEnum) => {
    try {
      await updateTodo({ ...todo, status });

      onChangeStatusTodo();
    } catch (error) {
      Notification({
        type: "error",
        description: t("components.modal_change_todo.error_load_todo_title"),
        message: t("components.modal_change_todo.error_load_todo_message"),
      });
    }
  }, []);

  const StatusIcon = useCallback(() => {
    let icon = (
      <RiRestartFill
        onClick={() => {
          handleChangeStatus(TodoStatusEnum.TODO);
        }}
        title={t("components.todo_item.hover_title_restart_todo")}
      />
    );

    if (todo.status === "doing") {
      icon = (
        <FaCheckCircle
          onClick={() => {
            handleChangeStatus(TodoStatusEnum.DONE);
          }}
          title={t("components.todo_item.hover_title_done_todo")}
        />
      );
    } else if (todo.status === "todo") {
      icon = (
        <FaRegCircle
          onClick={() => {
            handleChangeStatus(TodoStatusEnum.DOING);
          }}
          title={t("components.todo_item.hover_title_doing_todo")}
        />
      );
    }

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
