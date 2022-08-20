import { TodoStatusEnum } from "../../../domains/todo";

export interface AddTodoProps {
  color: string;
  description: string;
  date?: string;
  time?: string;
  status: "done" | "doing" | "todo";
}

export interface ListTodoProps {
  status: TodoStatusEnum;
}