export interface TodoItemInterface {
  id?: string;
  color: string;
  description: string;
  date: string;
  time: string;
  done: boolean;

  loadingItemAction?: boolean;
}

export interface TodoListInterface {
  loadingList: boolean;
  loadingSave: boolean;
  list: TodoItemInterface[];
}
