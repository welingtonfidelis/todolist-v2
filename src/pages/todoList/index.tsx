import { useEffect, useState } from "react";
import { Empty } from "antd";

import { ModalTodo } from "../../components/modalTodo";
import PrimaryButtonComponent from "../../components/primaryButton";
import TodoItemComponent from "../../components/todoItem";

import { listTodo } from "../../services/requests";

import { useTranslation } from "react-i18next";
import { TodoInterface, TodoStatusEnum } from "../../domains/todo";

import "./style.css";

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
  const [todoListData, setTodoListData] = useState<TodoInterface[]>([]);

  const getTodoList = async () => {
    const { ok, data } = await listTodo({ status: selectedOptionMenu });

    if (ok) setTodoListData(data || []);
  }

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

  return (
    <div className="todo-list-component-content">
      <div className="new-todo-content">
        <span>{t(`pages.todo_list.page_title_${selectedOptionMenu}`)}</span>
        <PrimaryButtonComponent
          onClick={() => handleChangeModalTodoProps(true)}
        >
          {t("pages.todo_list.button_new_task")}
        </PrimaryButtonComponent>
      </div>

      <div className="menu">
        <span
          className={
            selectedOptionMenu === TodoStatusEnum.DONE ? "menu-selected" : ""
          }
          onClick={() => setSelectedOptionMenu(TodoStatusEnum.DONE)}
        >
          {t("pages.todo_list.tab_option_done")}
        </span>
        <span
          className={
            selectedOptionMenu === TodoStatusEnum.DOING ? "menu-selected" : ""
          }
          onClick={() => setSelectedOptionMenu(TodoStatusEnum.DOING)}
        >
          {t("pages.todo_list.tab_option_doing")}
        </span>
        <span
          className={
            selectedOptionMenu === TodoStatusEnum.TODO ? "menu-selected" : ""
          }
          onClick={() => setSelectedOptionMenu(TodoStatusEnum.TODO)}
        >
          {t("pages.todo_list.tab_option_todo")}
        </span>
      </div>

      <div className="list">
        {todoListData.length ? (
          todoListData.map((item: TodoInterface) => (
            <TodoItemComponent
              todo={item}
              key={item.id}
              onEditTodo={() => handleChangeModalTodoProps(true, item.id)}
              onChangeStatusTodo={() => getTodoList()}
            />
          ))
        ) : (
          <Empty
            description="Lista vazia"
            className="list-empty"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </div>

      <ModalTodo
        onOk={handleSaveTodo}
        onCancel={() => handleChangeModalTodoProps(false)}
        {...todoModalProps}
      />
    </div>
  );
}
