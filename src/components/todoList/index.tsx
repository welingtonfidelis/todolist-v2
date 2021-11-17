import { useState } from "react";
import { TodoItemInterface } from "../../models/todo";
import { ModalTodo } from "../modalTodo";
import PrimaryButtonComponent from "../primaryButton";
import TodoItemComponent from "../todoItem";

import "./style.css";

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
  const [selectedTodo, setSelectedTodo] = useState<TodoItemInterface>(emptyTodo);

  const handleOpenModalTodo = () => {
    setShowTodoModal(true);
  };

  const handleCloseModalTodo = () => {
    setShowTodoModal(false);
    setSelectedTodo(emptyTodo);
  };

  const handleSaveTodo = (values: any) => {
    console.log("!", selectedTodo?.id, values);
  };

  const handleEditTodo = (item: any) => {
    setSelectedTodo(item);
    handleOpenModalTodo();
  };

  const handleSelectOptionMenu = (selected: "done" | "todo" | "all") => {
    setSelectedOptionMenu(selected);
  };

  const todoList: Array<any> = [];

  for (let i = 1; i <= 22; i += 1) {
    todoList.push({
      id: i + "",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis consequatur explicabo, ut, dolores, id est tenetur alias dolor incidunt dolorum quae qui aperiam molestias deserunt mollitia aspernatur quos natus modi.",
      date: "2021/11/01",
      time: "12:30",
      done: false,
      color: "FFC6FF",
    });
  }

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
        {todoList.map((item: TodoItemInterface) => (
          <TodoItemComponent
            {...item}
            key={item.id}
            onEditTodo={() => handleEditTodo(item)}
          />
        ))}
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
