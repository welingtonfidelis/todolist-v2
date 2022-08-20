import { Notification } from "../components/notification";
import { TodoItemInterface } from "../store/todo/model";

interface ResponseInterface {
  ok: boolean;
  data?: any;
}

interface ListFilter {
  status?: "done" | "todo";
}

let idCount = 1;
export const listTodo = (filter: ListFilter): ResponseInterface => {
  try {
    const stored = localStorage.getItem("todo@list#v2");//todoList;
    let list = stored ? JSON.parse(stored) : [];

    if (list.length && filter.status) {
      list = list.filter((item: TodoItemInterface) => item.done === (filter.status === "done"));
    }

    return { ok: true, data: list };
  } catch (error) {
    Notification({
      type: "error",
      description: "Lista de tarefas",
      message:
        "Houve um erro ao tentar trazer a lista de tarefas. Por favor, tente novamente.",
    });

    console.log("SAVE NEW TODO ERROR", error);

    return { ok: false };
  }
};

export const saveTodo = (todo: TodoItemInterface): ResponseInterface => {
  try {
    todo.id = idCount+ '';
    idCount += 1;

    const stored = localStorage.getItem("todo@list#v2");
    const todoStored: Array<TodoItemInterface> = stored ? JSON.parse(stored) : [];

    todoStored.push(todo);
    localStorage.setItem("todo@list#v2", JSON.stringify(todoStored));

    return { ok: true, data: todo };
  } catch (error) {
    Notification({
      type: "error",
      description: "Salvar tarefa",
      message:
        "Houve um erro ao tentar criar a tarefa. Por favor, tente novamente.",
    });

    console.log("SAVE NEW TODO ERROR", error);

    return { ok: false };
  }
};

export const updateTodo = (todo: TodoItemInterface): ResponseInterface => {
  try {
    let todoStored: Array<TodoItemInterface> = JSON.parse(localStorage.getItem("todo@list#v2")!);
    
    todoStored = todoStored.map(item => {
      if(item.id === todo.id) item = todo;

      return item;
    });

    localStorage.setItem("todo@list#v2", JSON.stringify(todoStored));

    return { ok: true, data: todo };
  } catch (error) {
    Notification({
      type: "error",
      description: "Salvar tarefa",
      message:
        "Houve um erro ao tentar salvar a tarefa. Por favor, tente novamente.",
    });

    console.log("UPDATE TODO ERROR", error);

    return { ok: false };
  }
};

export const updateStatusTodo = (
  id: string,
  status: boolean
): ResponseInterface => {
  try {
    let todoStored: Array<TodoItemInterface> = JSON.parse(localStorage.getItem("todo@list#v2")!);
    
    let todo;
    todoStored = todoStored.map(item => {
      if(item.id === id) {
        item.done = status;
        todo = item;
      }

      return item;
    });

    localStorage.setItem("todo@list#v2", JSON.stringify(todoStored));

    return { ok: true, data: todo };
  } catch (error) {
    Notification({
      type: "error",
      description: "Salvar tarefa",
      message:
        "Houve um erro ao tentar salvar a tarefa. Por favor, tente novamente.",
    });

    console.log("UPDATE TODO STATUS ERROR", error);

    return { ok: false };
  }
};
