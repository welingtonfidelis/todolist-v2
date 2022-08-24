import { TodoInterface, TodoStatusEnum } from "../../../domains/todo";

export interface AddTodoProps extends Omit<TodoInterface, 'id'> {}

export interface UpdateTodoProps extends TodoInterface {}

export interface ListTodoResponse {
  date: string;
  todo_list: TodoInterface[];
}

export interface ListTodoProps {
  status: TodoStatusEnum;
  offset: number;
  limit: number;
}