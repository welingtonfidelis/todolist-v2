import {
  Input,
  DatePickerProps,
  TimePickerProps,
  DatePicker,
  TimePicker,
  InputProps,
} from "antd";
import { TextAreaProps } from "antd/lib/input";

const { TextArea } = Input;

export const InputTextComponent = (props: InputProps) => {
  return (
    <Input size="large" allowClear={true} style={{ width: "100%" }} {...props}>
      {props.children}
    </Input>
  );
};

export const InputTextAreaComponent = (props: TextAreaProps) => {
  return (
    <TextArea
      size="large"
      allowClear={true}
      style={{ width: "100%" }}
      rows={6}
      {...props}
    >
      {props.children}
    </TextArea>
  );
};

export const DatePickerComponent = (props: DatePickerProps) => {
  return (
    <DatePicker
      size="large"
      allowClear={true}
      style={{ width: "100%" }}
      {...props}
    />
  );
};

export const TimePickerComponent = (props: TimePickerProps) => {
  return (
    <TimePicker
      size="large"
      allowClear={true}
      style={{ width: "100%" }}
      {...props}
    />
  );
};
