import {
  Input,
  DatePickerProps,
  TimePickerProps,
  DatePicker,
  TimePicker,
  InputProps,
} from "antd";
import { TextAreaProps } from "antd/lib/input";
import InputMask, { Props as InputMaskProps } from "react-input-mask";

const { TextArea } = Input;

export function InputTextAreaComponent(props: TextAreaProps) {
  return (
    <div className="input-text-area-component-content">
      <TextArea size="large" allowClear={true} rows={6} {...props}>
        {props.children}
      </TextArea>
    </div>
  );
}

export function DatePickerComponent(props: DatePickerProps) {
  return (
    <div className="date-picker-component-content">
      <DatePicker size="large" allowClear={true} {...props} />
    </div>
  );
}

export function TimePickerComponent(props: TimePickerProps) {
  return (
    <div className="date-picker-component-content">
      <TimePicker size="large" allowClear={true} {...props} />
    </div>
  );
}

export const InputMaskComponent = (props: InputMaskProps) => (
  <InputMask {...props}>
    {(inputProps: InputProps) => (
      <Input allowClear={true} size="large" {...inputProps} />
    )}
  </InputMask>
);
