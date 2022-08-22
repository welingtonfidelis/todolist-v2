import { TodoInterface } from "../domains/todo";
import { todoDB } from "./repositories/todo";
import { AddTodoProps, ListTodoProps, UpdateTodoProps } from "./repositories/todo/types";

interface ResponseInterface<T> {
  ok: boolean;
  data?: T;
}

export const listTodo = async (filter: ListTodoProps): Promise<ResponseInterface<TodoInterface[]>> => {
    const data = await todoDB.list(filter);

    return { ok: true, data: data };
};

export const findTodoById = async (id: number): Promise<ResponseInterface<TodoInterface>> => {
  const data = await todoDB.findById(id);

  return { ok: true, data: data };
}

export const newTodo = async (todo: AddTodoProps): Promise<ResponseInterface<{}>> => {
    await todoDB.add(todo)

    return { ok: true };
};

export const updateTodo = async (todo: UpdateTodoProps): Promise<ResponseInterface<{}>> => {
  await todoDB.update(todo)

  return { ok: true };
};

