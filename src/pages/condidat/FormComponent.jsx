import React, { useEffect, useState } from "react";
import { Button, Card, Space, Typography, Row, Col, Grid, Form } from "antd";
import InputComponent from "../../components/InputComponent";
import SelectComponent from "../../components/SelectComponent";
import InputNumberComponent from "../../components/InputNumberComponent";
import SelectMultipleComponent from "../../components/SelectMultipleComponent";
import DateComponent from "../../components/DateComponent";
const { useBreakpoint } = Grid;
const { Title } = Typography;
const formData = {
  id: 1,
  title: "Form",
  champs: [
    {
      id: 0,
      label: "Nom",
      type: 0,
      required: true,
      poids: 10,
    },
    {
      id: 1,
      label: "Prenom",
      type: 0,
      required: true,
      poids: 10,
    },
    {
      id: 2,
      label: "Email",
      type: 5,
      required: true,
      poids: 20,
    },
    {
      id: 3,
      label: "Select",
      type: 3,
      required: true,
      poids: 10,
      items:[
        {
            id:0,
            label:"item1",
            poids:10,
        },
        {
            id:1,
            label:"item2",
            poids:15,
        },
        {
            id:2,
            label:"item3",
            poids:10,
        },
      ]
    },
    {
      id: 4,
      label: "Select multiple",
      type: 4,
      required: false,
      poids: 10,
      items:[
        {
            id:0,
            label:"item1",
            poids:10,
        },
        {
            id:1,
            label:"item2",
            poids:15,
        },
        {
            id:2,
            label:"item3",
            poids:10,
        },
        {
            id:3,
            label:"item4",
            poids:10,
        }
      ]
    },
    {
      id: 5,
      label: "Date",
      type: 2,
      required: true,
      poids: 20,
    },
    {
      id: 6,
      label: "Note",
      type: 1,
      required: true,
      poids: 20,
    },
  ],
};
const FormComponent = () => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const [data, setData] = useState(formData);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [screens]);
  return (
    <div className="flex justify-center mt-10">
      <Card style={{ width: windowWidth > 750 ? 620 : "90%" }}>
        <Title level={3}>{data.title}</Title>
        <Form layout="vertical" form={form} onFinish={() => {}}>
          <Row gutter={[16]}>
            {data.champs.map((item) => (
              <Col span={24}>
                {
                  item.type===3?
                  <SelectComponent champ={item} />
                  :item.type===1?
                  <InputNumberComponent champ={item} />
                  :item.type===4?
                  <SelectMultipleComponent champ={item}/>
                  :item.type===2?
                  <DateComponent champ={item}/>
                  :<InputComponent champ={item} />
                }
              </Col>
          ))}
            <Col className="text-right" span={24}>
              <Space>
                <Button htmlType="reset"> Annuler </Button>
                <Button type="primary" htmlType="submit">
                  {" "}
                  Envoyer{" "}
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default FormComponent;
