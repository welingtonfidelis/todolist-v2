import { IndexableType } from "dexie";

import { TodoInterface } from "../../../domains/todo";
import { DB, localDB } from "../db";
import { AddTodoProps, ListTodoProps } from "./types";

class TodoDB {
  db: DB;

  constructor() {
    this.db = localDB;
  }

  list({ status }: ListTodoProps): Promise<TodoInterface[]> { 
    return this.db.todos.where('status').equals(status).toArray();
  }

  async findById(id: number): Promise<TodoInterface> {
    const [todo] = await this.db.todos.where('id').equals(id).toArray();

    return todo;
  }

  add(newTodo: AddTodoProps): Promise<IndexableType> {
    return this.db.todos.add(newTodo);
  }

  update(todo: TodoInterface): Promise<IndexableType> {
    return this.db.todos.update(todo.id!, todo);
  }
}

export const todoDB = new TodoDB();