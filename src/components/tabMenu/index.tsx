import { useTranslation } from "react-i18next";

import { TodoStatusEnum } from "../../domains/todo";
import { Container, Option } from "./style";
import { TabMenuProps } from "./types";

export default function TabMenu(props: TabMenuProps) {
  const { selectedOption, changeSelectedOption } = props;
  const { t } = useTranslation();

  const menuOptions = [
    {
      title: t("pages.todo_list.tab_option_done"),
      value: TodoStatusEnum.DONE,
    },
    {
      title: t("pages.todo_list.tab_option_doing"),
      value: TodoStatusEnum.DOING,
    },
    {
      title: t("pages.todo_list.tab_option_todo"),
      value: TodoStatusEnum.TODO,
    },
  ];
  return (
    <Container>
      {menuOptions.map((item) => (
        <Option
          selected={selectedOption === item.value}
          onClick={() => changeSelectedOption(item.value)}
          key={item.value}
        >
          {item.title}
        </Option>
      ))}
    </Container>
  );
}
