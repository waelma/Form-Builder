import React from "react";
import { DatePicker, Form } from "antd";
const DateComponent = ({ champ, values, setValues }) => {
  return (
    <Form.Item name={champ.label} rules={[{ required: champ.required }]}>
      <DatePicker
        placeholder={champ.required ? champ.label + " *" : champ.label}
        size="large"
        format={"DD-MM-YYYY"}
        onChange={(value, dateString) => {
          setValues([
            ...values.filter((item) => item.champ_id !== champ.id),
            {
              champ_id: champ.id,
              value: dateString,
              champ_type: champ.type_id,
              champ_poids: champ.poids,
            },
          ]);
        }}
      />
    </Form.Item>
  );
};

export default DateComponent;
