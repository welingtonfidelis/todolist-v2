import { Modal, Form, Radio } from "antd";
import moment from "moment";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { findTodoById, newTodo, updateTodo } from "../../services/requests";

import {
  InputTextAreaComponent,
  InputTextComponent,
  DatePickerComponent,
  TimePickerComponent,
} from "../input";
import { Notification } from "../notification";
import {
  ColorCardContainer,
  ColorCardItem,
  Container,
  DateTimeContainer,
} from "./style";

interface Props {
  todoId: number | null;
  visible: boolean;

  onOk: () => void;
  onCancel: () => void;
}

interface FormProps {
  id?: number;
  color: string;
  description: string;
  date?: string;
  time?: string;
  status: "done" | "doing" | "todo";
}

export const ModalTodo = (props: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<FormProps>();

  const colorCardOptions = [
    "F4A261",
    "FFC6FF",
    "FFADAD",
    "CAFFBF",
    "A0C4FF",
    "3772ff",
    "df2935",
    "fdca40",
    "e6e8e6",
    "f4d8cd",
    "edb183",
    "c3f73a",
    "ff773d",
    "d72483",
  ];

  const getTodo = useCallback(
    async (id: number) => {
      try {
        const { ok, data } = await findTodoById(id);
        console.log('data: ', data);

        if (ok && data) {
          form.setFieldsValue({
            ...data,
            date:
              data.date && data.date.length
                ? (moment(data.date) as any)
                : undefined,
            time:
              data.time && data.time.length
                ? (moment(data.time) as any)
                : undefined,
          });
        }
      } catch (error) {
        Notification({
          type: "error",
          description: t("components.modal_new_todo.error_load_todo_title"),
          message: t("components.modal_new_todo.error_load_todo_message"),
        });
      }
    },
    [form]
  );

  useEffect(() => {
    if (!props.visible) {
      form.resetFields();

      return;
    }

    if (props.todoId) getTodo(props.todoId);
  }, [form, getTodo, props.todoId, props.visible]);

  const handleSave = useCallback(async () => {
    const formData = await form.validateFields();
    try {
      formData.date = formData.date
        ? moment(new Date(formData.date)).utc().format()
        : "";
      formData.time = formData.time
        ? moment(new Date(formData.time)).format()
        : "";

      if (formData.id) await updateTodo({ ...formData, id: +formData.id });
      else {
        formData.status = "todo";
        await newTodo(formData);
      }

      props.onOk();
    } catch (error) {
      Notification({
        type: "error",
        description: t("components.modal_new_todo.error_save_todo_title"),
        message: t("components.modal_new_todo.error_save_todo_message"),
      });
    }    
  }, [form, props, t]);

  return (
    <Modal
      onOk={form.submit}
      visible={props.visible}
      onCancel={props.onCancel}
      okText={t("generic.button_save")}
      cancelText={t("generic.button_cancel")}
      title={
        props.todoId
          ? t("components.modal_new_todo.modal_title_edit")
          : t("components.modal_new_todo.modal_title_new")
      }
    >
      <Container>
        <Form
          onFinish={handleSave}
          form={form}
          className="modal-todo-component-content"
        >
          <Form.Item name="id" style={{ display: "none" }}>
            <InputTextComponent />
          </Form.Item>

          <Form.Item name="status" style={{ display: "none" }}>
            <InputTextComponent />
          </Form.Item>

          <ColorCardContainer>
            <Form.Item
              name="color"
              rules={[
                {
                  required: true,
                  message: t("components.modal_new_todo.input_error_color"),
                },
              ]}
            >
              <Radio.Group>
                {colorCardOptions.map((item) => (
                  <ColorCardItem value={item} color={item} key={item}/>
                ))}
              </Radio.Group>
            </Form.Item>
          </ColorCardContainer>

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

          <DateTimeContainer>
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
          </DateTimeContainer>
        </Form>
      </Container>
    </Modal>
  );
};
