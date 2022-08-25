import { Button, ButtonProps } from "antd";
import { Container } from "./style";

interface PropsInterface extends ButtonProps {}

export default function PrimaryButtonComponent(props: PropsInterface) {
  return (
    <Container>
      <Button type="primary" {...props}>{props.children}</Button>
    </Container>
  )
}