import {
  FaPen,
  FaRegCircle,
  FaRegCalendarAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { TodoItemInterface } from "../../store/todo/model";

import "./style.css";

interface ItemPropsIterface extends TodoItemInterface {
  onEditTodo: () => void;
  onChangeStatusTodo: () => void;
}

export default function TodoItemComponent(props: ItemPropsIterface) {
  return (
    <div
      className="todo-item-component-content"
      style={{ background: `#${props.color}` }}
    >
      <div className="col-1">
        <div className="description">{props.description}</div>

        <div className="date-time">
          <div className="date">
            <FaRegCalendarAlt />
            <span>{props.date}</span>
          </div>
          <div className="time">
            <FaClock />
            <span>{props.time}</span>
          </div>
        </div>
      </div>

      <div className="col-2">
        <FaPen onClick={props.onEditTodo} />
        {props.done ? (
          <FaCheckCircle onClick={props.onChangeStatusTodo} />
        ) : (
          <FaRegCircle onClick={props.onChangeStatusTodo} />
        )}
      </div>
    </div>
  );
}
