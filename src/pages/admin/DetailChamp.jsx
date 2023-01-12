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
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import moment from "moment";
const { Title } = Typography;
const { Option } = Select;
const DetailChamp = ({ isModalOpen, setIsModalOpen, champ, champs, setChamps }) => {
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
  ]);
  const [items, setItems] = useState([
    {
      id: 0,
      label: "",
      poids: 0,
    },
  ]);
  const [isTypeSelect, setIsTypeSelect] = useState(false);
  const [isTypeDate,setIsTypeDate] = useState(false);
  const [somme, setSomme]= useState(0)
  const [sommeX, setSommeX]= useState(0)
  
  useEffect(() => {
    if(isModalOpen){
        setIsTypeSelect(champ.type===3 || champ.type===4)
        setSomme(0)
        let s=0
      champs.map((item)=> {
        s+=item.poids
      })
       setSomme(s)
       setSommeX(s)
    setItems(champ.items)
    form.setFields([
      {
        name: ["label"],
        value: champ.label
      },
      {
        name: ["type"],
        value: champ.type
      },
      {
        name: ["required"],
        value: champ.required
      },
      {
        name: ["poids"],
        value: champ.poids
      },
    ]);}
  }, [isModalOpen]);
  return (
    <Modal
      title={<Title level={4}>Modifier Champ</Title>}
      open={isModalOpen}
      okText="Modifier"
      onOk={() => {
        form.resetFields();
        setItems([{}])
      }}
      onCancel={() => {
        form.resetFields();
        setIsModalOpen(false);
        setItems([{}])
      }}
      footer={[
        <Button key="back" onClick={()=>{setChamps(champs.filter(item=>item.id!==champ.id)); setIsModalOpen(false)}} danger>
          Supprimer
        </Button>,
        <Button key="submit" type="primary">
          Modifier
        </Button>,
      ]}
    >
      <Form layout="vertical" id="FieldForm" form={form}>
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
                    e===2 ? setIsTypeDate(true): setIsTypeDate(false)
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
                        onChange={(e) => {
                          let aux = items.filter((x) => x.id === item.id)[0];
                          aux.label = e.target.value;
                          setItems([
                            ...items.filter((x) => x.id !== item.id),
                            aux,
                          ]);
                          console.log(items);
                        }}
                        defaultValue={item.label}
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
                        onChange={(e) => {
                          let aux = items.filter((x) => x.id === item.id)[0];
                          aux.poids = e;
                          setItems([
                            ...items.filter((x) => x.id !== item.id),
                            aux,
                          ]);
                          console.log(items);
                        }}
                        defaultValue={item.poids}
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
                    setItems([
                      ...items,
                      { id: moment().valueOf()%1000000, label: "", poids: "" },
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
          {isTypeDate&&
            <>
          <Divider />
          <Title level={4} className="ml-2">
            Formule
          </Title>
          <Col span={24}>
            <Form.Item name="formule" label="Formule">
              <Input
                placeholder="Veuillez entrer la référence de prolongation"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button className="w-full" type="dashed" onClick={() => {}}>
              {" "}
              <PlusOutlined /> Ajouter un formule{" "}
            </Button>
          </Col>
         </>} 
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
                    valueStyle={{ color: sommeX===100?"#28B463":"#cf1322", fontSize: "16px" }}
                  />
                </Space>
              }
            >
              <InputNumber placeholder="Poids" size="large" onChange={(e)=>setSommeX(somme+e)}/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default DetailChamp;
