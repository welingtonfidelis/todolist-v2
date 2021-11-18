import { Modal, Form, Radio } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { TodoItemInterface } from "../../store/todo/model";

import {
  InputTextAreaComponent,
  InputTextComponent,
  DatePickerComponent,
  TimePickerComponent,
} from "../input";

import "./style.css";

interface Props extends TodoItemInterface {
  visible: boolean;
  title: string;

  onOk: (item: any) => void;
  onCancel: () => void;
}

const initialFormvalues = {
  id: null,
  color: null,
  description: null,
  date: "",
  time: "",
};

export const ModalTodo = (props: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.visible) setFormValues();
  }, [props.visible]);

  const setFormValues = () => {
    if (props.id) {
      form.setFieldsValue({
        ...props,
        date: props.date && props.date.length ? moment(props.date) : null,
        time: props.time && props.time.length ? moment(props.time) : null,
      });
    } else {
      form.setFieldsValue({ ...initialFormvalues });
    }
  };

  return (
    <Modal
      onOk={() => form.submit()}
      visible={props.visible}
      onCancel={props.onCancel}
      okText="Salvar"
      cancelText="Cancelar"
      title={props.id ? "Editar tarefa" : "Nova tarefa"}
    >
      <Form
        onFinish={props.onOk}
        form={form}
        className="modal-todo-component-content"
      >
        <Form.Item name="id" style={{ display: "none" }}>
          <InputTextComponent />
        </Form.Item>

        <Form.Item name="done" style={{ display: "none" }}>
          <InputTextComponent />
        </Form.Item>

        <Form.Item
          name="color"
          rules={[{ required: true, message: "Escolha uma cor" }]}
          className="color-palette"
        >
          <Radio.Group>
            <Radio value="F4A261" style={{ background: "#F4A261" }} />
            <Radio value="FFC6FF" style={{ background: "#FFC6FF" }} />
            <Radio value="FFADAD" style={{ background: "#FFADAD" }} />
            <Radio value="CAFFBF" style={{ background: "#CAFFBF" }} />
            <Radio value="A0C4FF" style={{ background: "#A0C4FF" }} />
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
            <DatePickerComponent format="DD/MM/YYYY"/>
          </Form.Item>
          <Form.Item name="time">
            <TimePickerComponent format="HH:mm"/>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
