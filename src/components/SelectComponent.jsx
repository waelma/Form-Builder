import React from 'react'
import { Select, Form } from 'antd'
const { Option } = Select
const SelectComponent = ({ champ, values, setValues }) => {
  //select search and sort
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  const filterSort = (optionA, optionB) =>
    (optionA?.label ?? '')
      .toLowerCase()
      .localeCompare((optionB?.label ?? '').toLowerCase())
  return (
    <Form.Item name={champ.label} rules={[{ required: champ.required }]}>
      <Select
        showSearch
        filterOption={filterOption}
        filterSort={filterSort}
        placeholder={champ.required ? champ.label + ' *' : champ.label}
        size="large"
        onChange={(e) => {
          setValues([
            ...values.filter((item) => item.champ_id !== champ.id),
            {
              champ_id: champ.id,
              value: e,
              champ_type: champ.type_id,
              champ_poids: champ.poids,
            },
          ])
        }}
      >
        {champ.items?.map((item) => (
          <Option key={item.id} value={item.id} label={item.label}>
            {item.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  )
}

export default SelectComponent
