import { notification } from "antd";

interface Props {
  message: string;
  description: string;
  type: "success" | "error" | "warning" | "info";
}

export const Notification = (props: Props) => {
  return notification[props.type]({
    message: props.message,
    description: props.description,
    duration: 5,
  });
};
