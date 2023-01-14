import React from 'react'
import { Input, Form } from 'antd'
const InputComponent = ({ champ, values, setValues }) => {
  return (
    <Form.Item name={champ.label} rules={[{ required: true }]}>
      <Input
        placeholder={champ.required ? champ.label + ' *' : champ.label}
        size="large"
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

export default InputComponent
