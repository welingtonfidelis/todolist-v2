import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { Empty } from "antd";

import { ModalTodo } from "../../components/modalTodo";
import PrimaryButtonComponent from "../../components/primaryButton";
import TodoItemComponent from "../../components/todoItem";

import { listTodo } from "../../services/requests";

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
    console.log("test");

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
            return (
              <TodoListContent>
                <TodoGroupItemsTitle>
                  <FaRegCalendarAlt />
                  {item.date
                    ? moment(new Date(item.date)).utc().format("DD/MM/YYYY")
                    : t("pages.todo_list.no_date_todo_title")}
                </TodoGroupItemsTitle>

                <TodoListGroupItems>
                  {item.todo_list.map((subItem) => (
                    <TodoItemComponent
                      todo={subItem}
                      key={subItem.id}
                      onEditTodo={() =>
                        handleChangeModalTodoProps(true, subItem.id)
                      }
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
