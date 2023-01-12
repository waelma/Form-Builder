import React from "react";
import { Input, Form } from "antd";
const PhoneInputComponent = ({ champ }) => {
  return (
    <Form.Item
      name={champ.label}
      rules={[
        { required: true },
        () => ({
          validator(_, e) {
            console.log(e.replaceAll(' ', ''));
            if (e.replaceAll(' ', '').length === 8 && parseInt(e.replaceAll(' ', ''))) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Invalide CIN"));
          },
        }),
      ]}
    >
      <Input
        addonBefore="+216"
        placeholder={champ.required ? champ.label + " *" : champ.label}
        size="large"
      />
    </Form.Item>
  );
};

export default PhoneInputComponent;
