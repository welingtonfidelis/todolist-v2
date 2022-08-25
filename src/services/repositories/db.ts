import Dexie, { Table } from 'dexie';
import { TodoInterface } from '../../domains/todo';

export class DB extends Dexie {
  todos!: Table<TodoInterface>;

  constructor() {
    super('todo_db');
    this.version(1).stores({
      todos: '++id, status, date'
    });
  }
}

export const localDB = new DB();