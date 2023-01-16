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
import dayjs from 'dayjs';
import moment from "moment";
import { useTranslation } from "react-i18next";
const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Option } = Select;
const DetailChamp = ({ isModalOpen, setIsModalOpen, champ, champs, setChamps }) => {
  const {t} = useTranslation();
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
  const [items, setItems] = useState([]);
  const [formules, setFormules] = useState([]);
  const [isTypeSelect, setIsTypeSelect] = useState(false);
  const [isTypeDate,setIsTypeDate] = useState(false);
  const [somme, setSomme]= useState(0)
  const [sommeX, setSommeX]= useState(0)
  const handleUpdate=(values)=>{
      form
      .validateFields()
      .then((values) => {
        setChamps([...champs.filter(item=>item.id!==champ.id),{
          id:champ.id,
          label: values.label,
          type: values.type,
          required: values.required===undefined?false:values.required,
          poids:values.poids===undefined?0:values.poids,
          items:items,
          formules: formules,
        }])
        setIsModalOpen(false)
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  }
  useEffect(() => {
    if(isModalOpen){
        setIsTypeSelect(champ.type===3 || champ.type===4)
        setIsTypeDate(champ.type===2)
        setSomme(0)
        let s=0
      champs.map((item)=> {
        s+=item.poids
      })
       setSomme(s)
       setSommeX(s)
    setItems(champ.items)
    setFormules(champ.formules)
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
      title={<Title level={4}>{t('Modifier Champ.1')}</Title>}
      open={isModalOpen}
      onOk={() => {
        // form.resetFields();
        // setItems([])
      }}
      onCancel={() => {
        // form.resetFields();
        setIsModalOpen(false);
        // setItems([])
      }}
      footer={[
        <Button key="back" onClick={()=>{setChamps(champs.filter(item=>item.id!==champ.id)); setIsModalOpen(false)}} danger>
          {t('Supprimer.1')}
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdate}>
          {t('Modifier.1')}
        </Button>,
      ]}
    >
      <Form layout="vertical" id="FieldForm" form={form}>
        <Row gutter={16} style={{ width: "100%" }}>
          <Title level={4} className="ml-2">
            {t('Informations.1')}
          </Title>
          <Col span={24}>
            <Form.Item
              name="label"
              label={t("Libellé.1")}
              rules={[{ required: true }]}
            >
              <Input placeholder={t("Libellé.1")} size="large" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="type" label={t("Type.1")} rules={[{ required: true }]}>
              <Select
                placeholder={t("Type.1")}
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
              <Form.Item label={t("Liste des items.1")}>
                {items.map((item) => (
                  <Input.Group compact className="mb-5" key={item.id}>
                    <Form.Item noStyle>
                      <Input
                        style={{ width: "62%" }}
                        size="large"
                        placeholder={t("Item libellé.1")}
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
                        placeholder={t("Poids.1")}
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
                        min={0}
                        max={100}
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
                  <PlusOutlined /> {t('Ajouter une item.1')}{" "}
                </Button>
              </Form.Item>
            </Col>
          )}
          <Col span={24}>
            <Form.Item label={t("Required.1")} name="required" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
          {isTypeDate && (
            <>
              <Divider />
              <Title level={4} className="ml-2">
                {t('Formule.1')}
              </Title>
              <Col span={24}>
                <Form.Item name="formule" label={t('Formule.1')} className="xxx">
                  {formules.map((item) => (
                    <Input.Group compact className="mb-5" key={item.id}>
                      <Form.Item noStyle>
                        <Select
                          placeholder={t("Type.1")}
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
                          defaultValue={item.type}
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
                            defaultValue={item.date&&[dayjs(item.date.substring(0, 4), 'YYYY'), dayjs(item.date.substring(5, 9), 'YYYY')]}
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
                          defaultValue={item.date&&dayjs(item.date, 'YYYY')}
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
                        defaultValue={item.poids}
                          style={{
                            width: "20%",
                            marginRight: "3%",
                            borderTopRightRadius: "6px",
                            borderBottomRightRadius: "6px",
                          }}
                          placeholder={t("Poids.1")}
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
                          min={0}
                        max={100}
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
                        { id: moment().valueOf() % 1000000},
                      ]);
                    }}
                  >
                    {" "}
                    <PlusOutlined /> {t('Ajouter un formule.1')}{" "}
                  </Button>
                </Form.Item>
              </Col>
            </>
          )}
          <Divider />
          <Title level={4} className="ml-2">
            {t('Poids.1')}
          </Title>
          <Col span={24}>
          <Form.Item
              name="poids"
              label={t('Poids.1')}
              extra={
                <Space>
                  {t('La somme des poids actuelle est.1')}
                  <Statistic
                    value={sommeX}
                    precision={1}
                    valueStyle={{ color: sommeX===100?"#28B463":"#cf1322", fontSize: "16px" }}
                  />
                </Space>
              }
            >
              <InputNumber placeholder="Poids" size="large" onChange={(e)=>setSommeX(somme-champ.poids+e)}
              min={0}
              max={100}/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default DetailChamp;
