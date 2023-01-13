import React, { useEffect, useState } from "react";
import "../../index.css";
import {
  Button,
  Select,
  Space,
  Typography,
  Row,
  Col,
  Modal,
  Input,
  Form,
  InputNumber,
  Divider,
  Switch,
  Statistic,
  DatePicker,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import moment from "moment";
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const CreateChamp = ({ isModalOpen, setIsModalOpen, champs, setChamps }) => {
  const [form] = Form.useForm();
  const [fieldType, setFieldType] = useState([
    {
      label: "Input",
      id: 0,
    },
    {
      label: "Input number",
      id: 1,
    },
    {
      label: "Date",
      id: 2,
    },
    {
      label: "Select",
      id: 3,
    },
    {
      label: "Select multiple",
      id: 4,
    },
    {
      label: "Email",
      id: 5,
    },
    {
      label: "CIN",
      id: 6,
    },
    {
      label: "Téléphone",
      id: 7,
    },
  ]);
  const [items, setItems] = useState([]);
  const [formules, setFormules] = useState([]);
  const [isTypeSelect, setIsTypeSelect] = useState(false);
  const [isTypeDate, setIsTypeDate] = useState(false);
  const [somme, setSomme] = useState(0);
  const [sommeX, setSommeX] = useState(0);
  const handleSubmit = (values) => {
    console.log([
      ...champs,
      {
        id: moment().valueOf() % 1000000,
        label: values.label,
        type: values.type,
        required: values.required === undefined ? false : values.required,
        poids: values.poids === undefined ? 0 : values.poids,
        items: items,
        formules: formules,
      },
    ]);
    setChamps([...champs,{
      id:moment().valueOf()%1000000,
      label: values.label,
      type: values.type,
      required: values.required===undefined?false:values.required,
      poids:values.poids===undefined?0:values.poids,
      items:items,
      formules: formules,
    }])
    setIsModalOpen(false)
  };
  useEffect(() => {
    setItems([]);
    setFormules([]);
    setIsTypeDate(false);
    setIsTypeSelect(false);
    if (isModalOpen) {
      setSomme(0);
      let s = 0;
      champs.map((item) => {
        s += item.poids;
      });
      setSomme(s);
      setSommeX(s);
    }
  }, [isModalOpen]);
  return (
    <Modal
      title={<Title level={4}>Nouveau Champ</Title>}
      open={isModalOpen}
      okText="Ajouter"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            handleSubmit(values);
            form.resetFields();
            setItems([]);
            setFormules([]);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => {
        form.resetFields();
        setIsModalOpen(false);
        setItems([]);
        setFormules([]);
      }}
    >
      <Form
        layout="vertical"
        id="FieldForm"
        form={form}
        onFinish={handleSubmit}
      >
        <Row gutter={16} style={{ width: "100%" }}>
          <Title level={4} className="ml-2">
            Informations
          </Title>
          <Col span={24}>
            <Form.Item
              name="label"
              label="Libellé"
              rules={[{ required: true }]}
            >
              <Input placeholder="Libellé" size="large" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="type" label="Type" rules={[{ required: true }]}>
              <Select
                placeholder="Type"
                size="large"
                onSelect={(e) => {
                  e === 3 || e === 4
                    ? setIsTypeSelect(true)
                    : setIsTypeSelect(false);
                  e === 2 ? setIsTypeDate(true) : setIsTypeDate(false);
                }}
              >
                {fieldType?.map((item) => (
                  <Option key={item.id} value={item.id} label={item.label}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {isTypeSelect && (
            <Col span={24}>
              <Form.Item label="Liste des items">
                {items.map((item) => (
                  <Input.Group compact className="mb-5" key={item.id}>
                    <Form.Item noStyle>
                      <Input
                        style={{ width: "62%" }}
                        size="large"
                        placeholder="Item libellé"
                        onBlur={(e) => {
                          let aux = items.filter((x) => x.id === item.id)[0];
                          aux.label = e.target.value;
                          setItems([
                            ...items.filter((x) => x.id !== item.id),
                            aux,
                          ]);
                        }}
                      />
                    </Form.Item>
                    <Form.Item noStyle>
                      <InputNumber
                        style={{
                          width: "30%",
                          marginRight: "3%",
                          borderTopRightRadius: "6px",
                          borderBottomRightRadius: "6px",
                        }}
                        placeholder="Poids"
                        size="large"
                        onBlur={(e) => {
                          let aux = items.filter((x) => x.id === item.id)[0];
                          aux.poids = e.target.value;
                          setItems([
                            ...items.filter((x) => x.id !== item.id),
                            aux,
                          ]);
                        }}
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => {
                        setItems(items.filter((x) => x.id !== item.id));
                      }}
                      style={{
                        fontSize: "18px",
                        margin: "0",
                        position: "absolute",
                        top: "50%",
                        msTransform: "translateY(-50%)",
                        transform: "translateY(-50%)",
                      }}
                    />
                  </Input.Group>
                ))}
                <Button
                  className="w-full"
                  type="dashed"
                  onClick={() => {
                    console.log([
                      ...items,
                      {
                        id: moment().valueOf() % 1000000,
                        label: "",
                        poids: "",
                      },
                    ]);
                    setItems([
                      ...items,
                      {
                        id: moment().valueOf() % 1000000,
                        label: "",
                        poids: "",
                      },
                    ]);
                  }}
                >
                  {" "}
                  <PlusOutlined /> Ajouter une item{" "}
                </Button>
              </Form.Item>
            </Col>
          )}
          <Col span={24}>
            <Form.Item label="Required" name="required" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
          {isTypeDate && (
            <>
              <Divider />
              <Title level={4} className="ml-2">
                Formule
              </Title>
              <Col span={24}>
                <Form.Item name="formule" label="Formule" className="xxx">
                  {formules.map((item) => (
                    <Input.Group compact className="mb-5" key={item.id}>
                      <Form.Item noStyle>
                        <Select
                          placeholder="Type"
                          size="large"
                          onSelect={(e) => {
                            let aux = formules.filter(
                              (x) => x.id === item.id
                            )[0];
                            aux.type = e;
                            setFormules([
                              ...formules.filter((x) => x.id !== item.id),
                              aux,
                            ]);
                          }}
                        >
                          <Option key={0} value={0} label="Inferieure à">
                            Inferieure à
                          </Option>
                          <Option key={1} value={1} label="Superieur à">
                            Superieur à
                          </Option>
                          <Option key={2} value={2} label="Entre">
                            Entre
                          </Option>
                        </Select>
                      </Form.Item>
                      <Form.Item noStyle>
                        {item.type === 2 ? (
                          <RangePicker
                            picker="year"
                            size="large"
                            onChange={(value, dateString) => {
                              let aux = formules.filter(
                                (x) => x.id === item.id
                              )[0];
                              aux.date = dateString[0]+'-'+dateString[1];
                              setFormules([
                                ...formules.filter((x) => x.id !== item.id),
                                aux,
                              ]);
                            }}
                          />
                        ) : (
                          <DatePicker picker="year" size="large"
                          onChange={(value, dateString) => {
                            let aux = formules.filter(
                              (x) => x.id === item.id
                            )[0];
                            aux.date = dateString;
                            setFormules([
                              ...formules.filter((x) => x.id !== item.id),
                              aux,
                            ]);
                          }} />
                        )}
                      </Form.Item>
                      <Form.Item noStyle>
                        <InputNumber
                          style={{
                            width: "20%",
                            marginRight: "3%",
                            borderTopRightRadius: "6px",
                            borderBottomRightRadius: "6px",
                          }}
                          placeholder="Poids"
                          size="large"
                          onChange={(e) => {
                            let aux = formules.filter(
                              (x) => x.id === item.id
                            )[0];
                            aux.poids = e;
                            setFormules([
                              ...formules.filter((x) => x.id !== item.id),
                              aux,
                            ]);
                          }}
                        />
                      </Form.Item>
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => {
                          setFormules(formules.filter((x) => x.id !== item.id));
                        }}
                        style={{
                          fontSize: "18px",
                          margin: "0",
                          position: "absolute",
                          top: "50%",
                          msTransform: "translateY(-50%)",
                          transform: "translateY(-50%)",
                        }}
                      />
                    </Input.Group>
                  ))}
                  <Button
                    className="w-full"
                    type="dashed"
                    onClick={() => {
                      setFormules([
                        ...formules,
                        { id: moment().valueOf() % 1000000,date:"", type: 0, poids: 0 },
                      ]);
                    }}
                  >
                    {" "}
                    <PlusOutlined /> Ajouter un formule{" "}
                  </Button>
                </Form.Item>
              </Col>
            </>
          )}
          <Divider />
          <Title level={4} className="ml-2">
            Poids
          </Title>
          <Col span={24}>
            <Form.Item
              name="poids"
              label="Poids"
              extra={
                <Space>
                  La somme des poids actuelle est
                  <Statistic
                    value={sommeX}
                    precision={1}
                    valueStyle={{
                      color: sommeX === 100 ? "#28B463" : "#cf1322",
                      fontSize: "16px",
                    }}
                  />
                </Space>
              }
            >
              <InputNumber
                placeholder="Poids"
                size="large"
                onChange={(e) => setSommeX(somme + e)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateChamp;
