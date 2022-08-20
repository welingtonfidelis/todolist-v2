import { useEffect, useState } from "react";
import { Empty } from "antd";

import { ModalTodo } from "../../components/modalTodo";
import PrimaryButtonComponent from "../../components/primaryButton";
import TodoItemComponent from "../../components/todoItem";

import {
  listTodo,
  saveTodo,
  updateStatusTodo,
  updateTodo,
} from "../../services/todoCrud";

import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { TodoItemInterface, TodoListInterface } from "../../store/todo/model";
import {
  todoAddItem,
  todoRemoveItem,
  todoUpdateItem,
  todoUpdateList,
  todoUpdateStatusItem,
} from "../../store/todo/actions";
import moment from "moment";
import { useTranslation } from "react-i18next";

const emptyTodo = {
  color: "",
  description: "",
  date: "",
  time: "",
  done: false,
};

export default function TodoListPage() {
  const { t } = useTranslation();

  const [selectedOptionMenu, setSelectedOptionMenu] = useState("doing");
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [selectedTodo, setSelectedTodo] =
    useState<TodoItemInterface>(emptyTodo);

  const dispatch = useDispatch();

  const todoOnReducer = useSelector(
    (state: { todo: TodoListInterface }) => state.todo
  );

  useEffect(() => {
    const { ok, data } = listTodo({ status: "todo" });

    if (ok) dispatch(todoUpdateList(data));
  }, [dispatch]);

  const handleOpenModalTodo = () => {
    setShowTodoModal(true);
  };

  const handleCloseModalTodo = () => {
    setShowTodoModal(false);
    setSelectedTodo(emptyTodo);
  };

  const handleEditTodo = (item: TodoItemInterface) => {
    setSelectedTodo(item);
    handleOpenModalTodo();
  };

  const handleSelectOptionMenu = (selected: "done" | "todo" | "doing") => {
    setSelectedOptionMenu(selected);
    console.log(
      "🚀 ~ file: index.tsx ~ line 72 ~ handleSelectOptionMenu ~ selected",
      selected
    );

    // const status = selected !== "all" ? selected : undefined;

    // const { ok, data } = listTodo({ status });

    // if (ok) dispatch(todoUpdateList(data));
  };

  const handleSaveTodo = (values: TodoItemInterface) => {
    values.date = values.date
      ? moment(new Date(values.date)).utc().format()
      : "";
    values.time = values.time
      ? moment(new Date(values.time)).utc().format()
      : "";
    values.done = values.done || false;

    if (values.id) {
      const { ok, data } = updateTodo(values);

      if (ok) dispatch(todoUpdateItem(data));
    } else {
      const { ok, data } = saveTodo(values);

      if (ok) dispatch(todoAddItem(data));
    }

    handleCloseModalTodo();
  };

  const handleUpdateStatusTodo = (id: string, status: boolean) => {
    const { ok } = updateStatusTodo(id, status);

    if (ok) {
      dispatch(todoUpdateStatusItem({ id, status }));

      if (
        (status && !["done", "all"].includes(selectedOptionMenu)) ||
        (!status && ["done"].includes(selectedOptionMenu))
      ) {
        dispatch(todoRemoveItem({ id }));
      }
    }
  };

  return (
    <div className="todo-list-component-content">
      <div className="new-todo-content">
        <span>{t(`pages.todo_list.page_title_${selectedOptionMenu}`)}</span>
        <PrimaryButtonComponent onClick={handleOpenModalTodo}>
          {t('pages.todo_list.button_new_task')}
        </PrimaryButtonComponent>
      </div>

      <div className="menu">
        <span
          className={selectedOptionMenu === "done" ? "menu-selected" : ""}
          onClick={() => handleSelectOptionMenu("done")}
        >
          {t("pages.todo_list.tab_option_done")}
        </span>
        <span
          className={selectedOptionMenu === "doing" ? "menu-selected" : ""}
          onClick={() => handleSelectOptionMenu("doing")}
        >
          {t("pages.todo_list.tab_option_doing")}
        </span>
        <span
          className={selectedOptionMenu === "todo" ? "menu-selected" : ""}
          onClick={() => handleSelectOptionMenu("todo")}
        >
          {t("pages.todo_list.tab_option_todo")}
        </span>
      </div>

      {/* <div className="list">
        {todoOnReducer.list.length ? (
          todoOnReducer.list.map((item: TodoItemInterface) => (
            <TodoItemComponent
              {...item}
              key={item.id}
              onEditTodo={() => handleEditTodo(item)}
              onChangeStatusTodo={() =>
                handleUpdateStatusTodo(item.id!, !item.done)
              }
            />
          ))
        ) : (
          <Empty
            description="Lista vazia"
            className="list-empty"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </div> */}

      <ModalTodo
        visible={showTodoModal}
        onOk={handleSaveTodo}
        onCancel={handleCloseModalTodo}
        {...selectedTodo}
      />
    </div>
  );
}
