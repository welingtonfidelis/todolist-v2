import { useEffect, useState } from "react";
import { TodoItemInterface } from "../../models/todo";
import { ModalTodo } from "../modalTodo";
import PrimaryButtonComponent from "../primaryButton";
import TodoItemComponent from "../todoItem";

import { listTodo, saveTodo, updateStatusTodo, updateTodo } from "../../services/todoCrud";

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
  const [list, setList] = useState<Array<TodoItemInterface>>([]);

  useEffect(() => {
    const { ok, data } = listTodo({ status: "todo" });
    if(ok) setList(data);
  }, []);

  const handleOpenModalTodo = () => {
    setShowTodoModal(true);
  };

  const handleCloseModalTodo = () => {
    setShowTodoModal(false);
    setSelectedTodo(emptyTodo);
  };

  const handleEditTodo = (item: any) => {
    setSelectedTodo(item);
    handleOpenModalTodo();
  };

  const handleSelectOptionMenu = (selected: "done" | "todo" | "all") => {
    setSelectedOptionMenu(selected);

    const status = selected !== "all" ? selected : undefined;

    const { ok, data } = listTodo({ status });
    
    if(ok) setList(data);
  };

  const handleSaveTodo = (values: TodoItemInterface) => {
    values.date = values.date || "";
    values.time = values.time || "";
    
    if(values.id) {
      updateTodo(values);
    }
    else {
      saveTodo(values);
    }

    handleCloseModalTodo();
  };

  const handleUpdateStatusTodo = (id: string, status: boolean) => {
    const { ok, data} = updateStatusTodo(id, status);
    
    if(ok) {
      const index = list.findIndex((item) => item.id === id);
      const tempList = list;
      tempList[index] = { ...tempList[index], done: status };
      setList(tempList);
    }
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
        {list.length && list.map((item: TodoItemInterface) => (
          <TodoItemComponent
            {...item}
            key={item.id}
            onEditTodo={() => handleEditTodo(item)}
            onChangeStatusTodo={() => handleUpdateStatusTodo(item.id!, !item.done)}
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
