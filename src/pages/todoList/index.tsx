import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { Empty } from "antd";

import { ModalTodo } from "../../components/modalTodo";
import PrimaryButtonComponent from "../../components/primaryButton";
import TodoItemComponent from "../../components/todoItem";

import { deleTodo, listTodo } from "../../services/requests";

import { useTranslation } from "react-i18next";
import { TodoStatusEnum } from "../../domains/todo";

import {
  Container,
  NewTodoContainer,
  TodoGroupItemsTitle,
  TodoListContainer,
  TodoListContent,
  TodoListGroupItems,
} from "./style";
import { ListTodoResponse } from "../../services/repositories/todo/types";
import { FaRegCalendarAlt } from "react-icons/fa";
import TabMenu from "../../components/tabMenu";
import { Notification } from "../../components/notification";

interface TodoModalProps {
  todoId: number | null;
  visible: boolean;
}

export default function TodoListPage() {
  const { t } = useTranslation();

  const [selectedOptionMenu, setSelectedOptionMenu] = useState<TodoStatusEnum>(
    TodoStatusEnum.DOING
  );
  const [todoModalProps, setTodoModalProps] = useState<TodoModalProps>({
    visible: false,
    todoId: null,
  });
  const [todoListData, setTodoListData] = useState<ListTodoResponse[]>([]);

  const getTodoList = async () => {
    const { ok, data } = await listTodo({
      status: selectedOptionMenu,
      offset: 0,
      limit: 100,
    });

    if (ok) setTodoListData(data || []);
  };

  useEffect(() => {
    getTodoList();
  }, [selectedOptionMenu]);

  const handleChangeModalTodoProps = (
    visible: boolean,
    todoId: number | null = null
  ) => {
    setTodoModalProps({
      visible,
      todoId,
    });
  };

  const handleSaveTodo = () => {
    handleChangeModalTodoProps(false);

    getTodoList();
  };

  const handleDeleteTodo = useCallback(
    async (id: number) => {
      try {
        await deleTodo(id);

        getTodoList();
      } catch (error) {
        Notification({
          type: "error",
          description: t("components.todo_item.error_delete_todo_title"),
          message: t("components.todo_item.error_delete_todo_message"),
        });
      }
    },
    [t]
  );

  return (
    <Container>
      <NewTodoContainer>
        <span>{t(`pages.todo_list.page_title_${selectedOptionMenu}`)}</span>

        <PrimaryButtonComponent
          onClick={() => handleChangeModalTodoProps(true)}
        >
          {t("pages.todo_list.button_new_task")}
        </PrimaryButtonComponent>
      </NewTodoContainer>

      <TabMenu
        selectedOption={selectedOptionMenu}
        changeSelectedOption={setSelectedOptionMenu}
      />

      <TodoListContainer>
        {todoListData.length ? (
          todoListData.map((item, index) => {
            let hasExpiredDate = false;
            if (selectedOptionMenu !== TodoStatusEnum.DONE && item.date) {
              const todoDate = moment(item.date);
              const today = moment();

              hasExpiredDate = today.isAfter(todoDate, "date");
            }

            return (
              <TodoListContent>
                <TodoGroupItemsTitle isFirst={index === 0}>
                  <FaRegCalendarAlt color={hasExpiredDate ? "red" : ""} />
                  {item.date
                    ? moment(new Date(item.date)).utc().format("DD/MM/YYYY")
                    : t("pages.todo_list.no_date_todo_title")}
                </TodoGroupItemsTitle>

                <TodoListGroupItems>
                  {item.todo_list.map((subItem) => (
                    <TodoItemComponent
                      todo={subItem}
                      key={subItem.id}
                      onEditTodo={() => handleChangeModalTodoProps(true, subItem.id)}
                      onDeleteTodo={() => handleDeleteTodo(subItem.id!)}
                      onChangeStatusTodo={getTodoList}
                    />
                  ))}
                </TodoListGroupItems>
              </TodoListContent>
            );
          })
        ) : (
          <Empty
            description="Lista vazia"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </TodoListContainer>

      <ModalTodo
        onOk={handleSaveTodo}
        onCancel={() => handleChangeModalTodoProps(false)}
        {...todoModalProps}
      />
    </Container>
  );
}
