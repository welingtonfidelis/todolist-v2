import { Notification } from "../components/notification";
import { TodoInterface } from "../domains/todo";
import { todoDB } from "./repositories/todo";
import { AddTodoProps, ListTodoProps } from "./repositories/todo/types";

interface ResponseInterface<T> {
  ok: boolean;
  data?: T;
}

export const listTodo = async (filter: ListTodoProps): Promise<ResponseInterface<TodoInterface[]>> => {
    // const stored = localStorage.getItem("todo@list#v2");//todoList;
    // let list = stored ? JSON.parse(stored) : [];

    // if (list.length && filter.status) {
    //   list = list.filter((item: TodoItemInterface) => item.done === (filter.status === "done"));
    // }

    const data = await todoDB.find(filter);

    return { ok: true, data: data };
};

export const saveTodo = async (todo: AddTodoProps): Promise<ResponseInterface<{}>> => {
    await todoDB.add(todo)

    return { ok: true };
};

export const updateTodo = (todo: TodoInterface): ResponseInterface<any> => {
  try {
    
    return { ok: true };
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
): ResponseInterface<any> => {
  try {

    return { ok: true };
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
