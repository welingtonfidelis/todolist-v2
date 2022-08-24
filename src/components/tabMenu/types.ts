import { TodoStatusEnum } from "../../domains/todo";

export interface TabMenuProps {
  selectedOption: TodoStatusEnum;
  changeSelectedOption: (option: TodoStatusEnum) => void;
}