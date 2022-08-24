import { IndexableType } from "dexie";
import moment from "moment";

import { TodoInterface } from "../../../domains/todo";
import { DB, localDB } from "../db";
import { AddTodoProps, ListTodoProps, ListTodoResponse } from "./types";

class TodoDB {
  db: DB;

  constructor() {
    this.db = localDB;
  }

  async list({
    status,
    offset,
    limit,
  }: ListTodoProps): Promise<ListTodoResponse[]> {
    const todos = await this.db.todos
      .orderBy("date")
      .and((todo) => todo.status === status)
      .reverse()
      .offset(offset)
      .limit(limit)
      .toArray();

    const todoList: ListTodoResponse[] = [];

    todos.forEach((todo, index) => {
      if (index === 0) {
        todoList.push({
          date: todo.date || "",
          todo_list: [todo],
        });
      } else {
        const todoListIndex = todoList.length - 1;
        const isSameDate = moment(todo.date).isSame(
          todoList[todoListIndex].date,
          "date"
        );

        if (isSameDate) todoList[todoListIndex].todo_list.push(todo);
        else {
          todoList.push({
            date: todo.date || "",
            todo_list: [todo],
          });
        }
      }
    });

    return todoList;
  }

  async findById(id: number): Promise<TodoInterface> {
    const [todo] = await this.db.todos.where("id").equals(id).toArray();

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