import moment from "moment";
import { useCallback } from "react";
import {
  FaPen,
  FaRegCircle,
  FaRegCalendarAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { RiRestartFill } from "react-icons/ri";

import { TodoInterface, TodoStatusEnum } from "../../domains/todo";
import { updateTodo } from "../../services/requests";
import { Notification } from "../notification";


import "./style.css";

interface ItemPropsIterface {
  todo: TodoInterface;
  onEditTodo: () => void;
  onChangeStatusTodo: () => void;
}

export default function TodoItemComponent(props: ItemPropsIterface) {
  const { todo, onEditTodo, onChangeStatusTodo } = props;
  
  let expiredDateClass = "";
  if (todo.date) {
    const todoDate = moment(todo.date);
    const today = moment();

    if(today.isAfter(todoDate, "date")) expiredDateClass = "date-expired";
  }

  const handleChangeStatus = useCallback(async (status: TodoStatusEnum) => {
  try {
    await updateTodo({ ...todo, status });

    onChangeStatusTodo();
  } catch (error) {
    Notification({
      type: "error",
      description: "Salvar tarefa",
      message:
        "Houve um erro ao tentar alterar o status da tarefa. Por favor, tente novamente.",
    });
  }
  }, []);

  const StatusIcon = useCallback(() => {
    let icon = <RiRestartFill onClick={() => {handleChangeStatus(TodoStatusEnum.TODO)}} />;

    if (todo.status === 'doing') icon = <FaCheckCircle onClick={() => {handleChangeStatus(TodoStatusEnum.DONE)}} />;
    else if (todo.status === 'todo') icon = <FaRegCircle onClick={() => {handleChangeStatus(TodoStatusEnum.DOING)}} />;

    return icon;
  }, []);

  return (
    <div
      className="todo-item-component-content"
      style={{ background: `#${todo.color}` }}
    >
      <div className="col-1">
        <div className="description">{todo.description}</div>

        <div className="date-time">
          <div className={`date ${expiredDateClass}`}>
            {todo.date && (
              <>
                <FaRegCalendarAlt />
                <span>{moment(new Date(todo.date)).utc().format("DD/MM/YYYY")}</span>
              </>
            )}
          </div>
          <div className="time">
            {todo.time && (
              <>
                <FaClock />
                <span>{moment(new Date(todo.time)).format("HH:mm")}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="col-2">
        <FaPen onClick={onEditTodo} />
        <StatusIcon />
      </div>
    </div>
  );
}
