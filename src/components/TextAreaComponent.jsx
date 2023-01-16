import React from 'react'
import { Input, Form } from 'antd'
const { TextArea } = Input;
const TextAreaComponent = ({ champ, values, setValues }) => {
  return (
    <Form.Item name={champ.label} rules={[{ required: champ.required }]}>
    <TextArea
      placeholder={champ.required ? champ.label + ' *' : champ.label}
      rows={3}
      onBlur={(e) => {
        setValues([
          ...values.filter((item) => item.champ_id !== champ.id),
          {
            champ_id: champ.id,
            value: e.target.value,
            champ_type: champ.type_id,
            champ_poids: champ.poids,
          },
        ])
      }}
    />
  </Form.Item>
  )
}

export default TextAreaComponent