import { TodoInterface } from "../../../domains/todo";
import { DB, localDB } from "../db";
import { AddTodoProps, ListTodoProps } from "./types";

class TodoDB {
  db: DB;

  constructor() {
    this.db = localDB;
  }

  async find({ status }: ListTodoProps): Promise<TodoInterface[]> { 
    return await this.db.todos.where('status').equals(status).toArray();
  }

  async add(newTodo: AddTodoProps) {
    return await this.db.todos.add(newTodo);
  }
}

export const todoDB = new TodoDB();