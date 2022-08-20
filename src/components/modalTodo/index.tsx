import { Modal, Form, Radio } from "antd";
import moment from "moment";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const setFormValues = useCallback(() => {
    if (props.id) {
      form.setFieldsValue({
        ...props,
        date: props.date && props.date.length ? moment(props.date) : null,
        time: props.time && props.time.length ? moment(props.time) : null,
      });
    } else {
      form.setFieldsValue({ ...initialFormvalues });
    }
  }, [form, props]);

  useEffect(() => {
    if (props.visible) setFormValues();
  }, [props.visible, setFormValues]);

  return (
    <Modal
      onOk={() => form.submit()}
      visible={props.visible}
      onCancel={props.onCancel}
      okText={t("generic.button_save")}
      cancelText={t("generic.button_cancel")}
      title={
        props.id
          ? t("components.modal_new_todo.modal_title_edit")
          : t("components.modal_new_todo.modal_title_new")
      }
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
          rules={[
            {
              required: true,
              message: t("components.modal_new_todo.input_error_color"),
            },
          ]}
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
              message: t("components.modal_new_todo.input_error_description"),
            },
          ]}
          className="input-text"
        >
          <InputTextAreaComponent
            placeholder={t(
              "components.modal_new_todo.input_placeholder_description"
            )}
          />
        </Form.Item>

        <div className="input-date-time">
          <Form.Item name="date">
            <DatePickerComponent
              placeholder={t(
                "components.modal_new_todo.input_placeholder_date"
              )}
              format="DD/MM/YYYY"
            />
          </Form.Item>
          <Form.Item name="time">
            <TimePickerComponent
              placeholder={t(
                "components.modal_new_todo.input_placeholder_time"
              )}
              format="HH:mm"
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
