import { Dropdown, Menu, Popconfirm } from "antd";
import moment from "moment";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  FaPen,
  FaClock,
  FaTrash,
} from "react-icons/fa";

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
  onDeleteTodo: () => void;
  onChangeStatusTodo: () => void;
}

export default function TodoItemComponent(props: ItemPropsIterface) {
  const { todo, onEditTodo, onDeleteTodo, onChangeStatusTodo } = props;
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

  const menuOptionEdit = {
    key: "1",
    label: t("components.todo_item.menu_option_edit"),
    onClick: onEditTodo,
  };
  const menuOptionTodo = {
    key: "2",
    label: t("components.todo_item.menu_option_todo"),
    onClick: () => handleChangeStatus(TodoStatusEnum.TODO),
  };
  const menuOptionDoing = {
    key: "3",
    label: t("components.todo_item.menu_option_doing"),
    onClick: () => handleChangeStatus(TodoStatusEnum.DOING),
  };
  const menuOptionDone = {
    key: "4",
    label: t("components.todo_item.menu_option_done"),
    onClick: () => handleChangeStatus(TodoStatusEnum.DONE),
  };

  const menuOptionList = [menuOptionEdit];

  if (todo.status === TodoStatusEnum.TODO) menuOptionList.push(menuOptionDoing, menuOptionDone);
  else if (todo.status === TodoStatusEnum.DOING) menuOptionList.push(menuOptionTodo, menuOptionDone);
  else menuOptionList.push(menuOptionTodo, menuOptionDoing);

  return (
    <Container backgroundColor={todo.color}>
      <Col1>
        <Description>{todo.description}</Description>

        <DateTimeContainer>
          {todo.time && (
            <DateTimeContent hasExpiredDate={false}>
              <FaClock />
              <span>{moment(new Date(todo.time)).format("HH:mm")}</span>
            </DateTimeContent>
          )}
        </DateTimeContainer>
      </Col1>

      <Col2>
        <Dropdown
          overlay={<Menu items={menuOptionList} />}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
          trigger={["click"]}
          getPopupContainer={(e) => e.parentElement as HTMLElement}
        >
          <FaPen />
        </Dropdown>

        <Popconfirm
          placement="bottomRight"
          title={t("components.todo_item.menu_option_delete_message")}
          onConfirm={onDeleteTodo}
          okText={t("generic.button_yes")}
          cancelText={t("generic.button_no")}
        >
          <FaTrash />
        </Popconfirm>
      </Col2>
    </Container>
  );
}
