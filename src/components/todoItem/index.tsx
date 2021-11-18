import moment from "moment";
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
  let expiredDateClass = "";

  if (props.date) {
    const todoDate = moment(props.date);
    const today = moment();

    if(today.isAfter(todoDate, "date")) expiredDateClass = "date-expired";
  }
  return (
    <div
      className="todo-item-component-content"
      style={{ background: `#${props.color}` }}
    >
      <div className="col-1">
        <div className="description">{props.description}</div>

        <div className="date-time">
          <div className={`date ${expiredDateClass}`}>
            {props.date && (
              <>
                <FaRegCalendarAlt />
                <span>{moment(new Date(props.date)).utc().format("DD/MM/YYYY")}</span>
              </>
            )}
          </div>
          <div className="time">
            {props.time && (
              <>
                <FaClock />
                <span>{moment(new Date(props.time)).utc().format("HH:mm")}</span>
              </>
            )}
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
