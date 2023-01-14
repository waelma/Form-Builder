import React from 'react'
import { InputNumber, Form } from 'antd'

const InputNumberComponent = ({ champ, values, setValues }) => {
  return (
    <Form.Item name={champ.label} rules={[{ required: champ.required }]}>
      <InputNumber
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

export default InputNumberComponent
