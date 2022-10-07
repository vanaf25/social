import React from "react";
import {  Form,  Select } from "antd";
const FormItem = Form.Item;
const { Option } = Select;
const CreateAntField = (AntComponent:React.FC) => ({
  field,
  form,
  hasFeedback,
  label,
  selectOptions,
  submitCount,
    defaultValue,
  type,
  ...props
}:any) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { value } }:{target:{value:string}}) =>
    form.setFieldValue(field.name, value);
  const onChange = (value:string) => form.setFieldValue(field.name, value);
  const onBlur = () => form.setFieldTouched(field.name, true);
  return (
    <div className="field-container">
      <FormItem
        label={label}
        hasFeedback={
          (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
        }
        help={submittedError || touchedError ? hasError : false}
        validateStatus={submittedError || touchedError ? "error" : "success"}
      >
        <AntComponent
          {...field}
          {...props}
          onBlur={onBlur}
          onChange={type ? onInputChange : onChange}
          defaultValue={defaultValue}
        >
          {selectOptions &&
            selectOptions.values.map((name:string,index:number) =>
                <Option  key={name} value={name}>{selectOptions.initializingValues[index]}</Option>)}
        </AntComponent>
      </FormItem>
    </div>
  );
};
export const AntSelect = CreateAntField(Select);
