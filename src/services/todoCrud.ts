import { TodoItemInterface } from "../models/todo";

const todoList: Array<TodoItemInterface> = [];

for (let i = 1; i <= 2; i += 1) {
  todoList.push({
    id: i + "",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis consequatur explicabo, ut, dolores, id est tenetur alias dolor incidunt dolorum quae qui aperiam molestias deserunt mollitia aspernatur quos natus modi.",
    date: "2021/11/01",
    time: "12:30",
    done: false,
    color: "FFC6FF",
  });
}

interface ResponseInterface {
  ok: boolean;
  data?: any;
}

interface ListFilter {
  status?: "done" | "todo";
}

export const listTodo = (filter: ListFilter): ResponseInterface => {
  try {
    let list = todoList;

    if(filter.status) {
      list = list.filter(item => item.done === (filter.status === "done"));
    }

    return { ok:  true, data: list }
    
  } catch (error) {
    console.log("SAVE NEW TODO ERROR", error);
    
    return { ok: false };
  }
}

export const saveTodo = (todo: TodoItemInterface): ResponseInterface => {
  try {
    todo.id = todoList.length + 1 + "";

    todoList.push(todo);
    
    return { ok:  true, data: todo }
  } catch (error) {
    console.log("SAVE NEW TODO ERROR", error);
    
    return { ok: false };
  }
}

export const updateTodo = (todo: TodoItemInterface): ResponseInterface => {
  try {
    const index = todoList.findIndex((item) => item.id === todo.id);

    todoList[index] = todo;
    
    return { ok:  true, data: todo }
  } catch (error) {
    console.log("UPDATE TODO ERROR", error);
    
    return { ok: false };
  }
}

export const updateStatusTodo = (id: string, status: boolean): ResponseInterface => {
  try {
    const index = todoList.findIndex((item) => item.id === id);

    todoList[index] = {...todoList[index], done: status};
    
    return { ok:  true, data: todoList[index] }
  } catch (error) {
    console.log("UPDATE TODO STATUS ERROR", error);
    
    return { ok: false };
  }
}