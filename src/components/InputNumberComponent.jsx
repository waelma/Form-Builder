import React from 'react'
import { InputNumber, Form } from 'antd';

const InputNumberComponent = ({champ}) => {
  return (
    <Form.Item
    name={champ.label}
    rules={[{ required: champ.required}]}
  >
    <InputNumber placeholder={champ.required? champ.label + " *":champ.label} size="large" />
    </Form.Item>
  )
}

export default InputNumberComponent