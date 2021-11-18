import { useEffect, useState } from "react";
import { Empty } from "antd";

import { ModalTodo } from "../modalTodo";
import PrimaryButtonComponent from "../primaryButton";
import TodoItemComponent from "../todoItem";

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

const emptyTodo = {
  color: "",
  description: "",
  date: "",
  time: "",
  done: false,
};

export default function TodoListComponent() {
  const [selectedOptionMenu, setSelectedOptionMenu] = useState("todo");
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
  }, []);

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

  const handleSelectOptionMenu = (selected: "done" | "todo" | "all") => {
    setSelectedOptionMenu(selected);

    const status = selected !== "all" ? selected : undefined;

    const { ok, data } = listTodo({ status });

    if (ok) dispatch(todoUpdateList(data));
  };

  const handleSaveTodo = (values: TodoItemInterface) => {
    values.date = values.date || "";
    values.time = values.time || "";

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
    const { ok, data } = updateStatusTodo(id, status);

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
        <span>Aqui está o que temos para fazer.</span>
        <PrimaryButtonComponent onClick={handleOpenModalTodo}>
          Nova tarefa
        </PrimaryButtonComponent>
      </div>

      <div className="menu">
        <span
          className={selectedOptionMenu === "done" ? "menu-selected" : ""}
          onClick={() => handleSelectOptionMenu("done")}
        >
          Feitas
        </span>
        <span
          className={selectedOptionMenu === "todo" ? "menu-selected" : ""}
          onClick={() => handleSelectOptionMenu("todo")}
        >
          À fazer
        </span>
        <span
          className={selectedOptionMenu === "all" ? "menu-selected" : ""}
          onClick={() => handleSelectOptionMenu("all")}
        >
          Todas
        </span>
      </div>

      <div className="list">
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
      </div>

      <ModalTodo
        visible={showTodoModal}
        title="Nova tarefa"
        onOk={handleSaveTodo}
        onCancel={handleCloseModalTodo}
        {...selectedTodo}
      />
    </div>
  );
}
