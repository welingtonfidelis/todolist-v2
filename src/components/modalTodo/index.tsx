import { Modal, Form, Radio } from "antd";
import { useEffect } from "react";
import { TodoItemInterface } from "../../models/todo";
import {
  InputTextAreaComponent,
  InputMaskComponent,
  InputTextComponent,
} from "../input";

import "./style.css";

interface Props extends TodoItemInterface{
  visible: boolean;
  title: string;

  onOk: (item: any) => void;
  onCancel: () => void;
}

export const ModalTodo = (props: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.visible) {
      form.setFieldsValue({
        ...props,
      });
    }
    else {
      form.setFieldsValue({
        id: null,
        color: null,
        description: null,
        date: "",
        time: "",
      });
    }    
  }, [props.visible]);

  return (
    <Modal
      onOk={() => form.submit()}
      visible={props.visible}
      onCancel={props.onCancel}
      okText="Salvar"
      cancelText="Cancelar"
      title={ props.id ? "Editar tarefa" : "Nova tarefa" }
    >
      <Form
        onFinish={props.onOk}
        form={form}
        className="modal-todo-component-content"
      >
        <Form.Item name="id" style={{ display: "none" }}>
          <InputTextComponent />
        </Form.Item>

        <Form.Item
          name="color"
          rules={[{ required: true, message: "Escolha uma cor" }]}
          className="color-palette"
        >
          <Radio.Group>
            <Radio value="F4A261" style={{background: "#F4A261"}} />
            <Radio value="FFC6FF" style={{background: "#FFC6FF"}} />
            <Radio value="FFADAD" style={{background: "#FFADAD"}} />
            <Radio value="CAFFBF" style={{background: "#CAFFBF"}} />
            <Radio value="A0C4FF" style={{background: "#A0C4FF"}} />
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Insira uma descrição",
            },
          ]}
          className="input-text"
        >
          <InputTextAreaComponent placeholder="Descrição" />
        </Form.Item>

        <div className="input-date-time">
          <Form.Item name="date">
            <InputMaskComponent mask="99/99/9999" placeholder="Data" />
          </Form.Item>
          <Form.Item name="time">
            <InputMaskComponent mask="99:99" placeholder="Horário" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
