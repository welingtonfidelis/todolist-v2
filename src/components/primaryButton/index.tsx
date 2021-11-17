import { Button, ButtonProps } from "antd";

import "./style.css";

interface PropsInterface extends ButtonProps {}

export default function PrimaryButtonComponent(props: PropsInterface) {
  return (
    <div className="primary-button-component-content">
      <Button type="primary" {...props}>{props.children}</Button>
    </div>
  )
}