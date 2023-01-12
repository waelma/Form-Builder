import React from 'react'
import { Input, Form } from 'antd';
const EmailInputComponent = ({champ}) => {
  return (
    <Form.Item
    name={champ.label}
    rules={[{ required: true,
        type: 'email' }]}
  >
    <Input placeholder={champ.required? champ.label + " *":champ.label} size="large" />
    </Form.Item>
  )
}

export default EmailInputComponent