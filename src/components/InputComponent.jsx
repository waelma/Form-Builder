import React from 'react'
import { Input, Form } from 'antd';
const InputComponent = ({champ}) => {
  return (
    <Form.Item
    name={champ.label}
    rules={[{ required: true}]}
  >
    <Input placeholder={champ.required? champ.label + " *":champ.label} size="large" />
    </Form.Item>
  )
}

export default InputComponent