import React from 'react'
import { DatePicker, Form } from 'antd';
const DateComponent = ({champ}) => {
  return (
    <Form.Item
    name={champ.label}
    rules={[{ required: champ.required}]}
  >
    <DatePicker placeholder={champ.required? champ.label + " *":champ.label} size="large" format={"DD-MM-YYYY"}/>
  </Form.Item> 
  )
}

export default DateComponent