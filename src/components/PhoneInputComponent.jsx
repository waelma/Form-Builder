import React from 'react'
import { Input, Form } from 'antd'
const PhoneInputComponent = ({ champ, values, setValues }) => {
  return (
    <Form.Item
      name={champ.label}
      rules={[
        { required: champ.required },
        () => ({
          validator(_, e) {
            if ((champ.required===0 && e.length===0)||
             (e.replaceAll(' ', '').length === 8 &&
              parseInt(e.replaceAll(' ', '')))
            ) {
              return Promise.resolve()
            }
            return Promise.reject(new Error('Invalide numéro'))
          },
        }),
      ]}
    >
      <Input
        addonBefore="+216"
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

export default PhoneInputComponent
