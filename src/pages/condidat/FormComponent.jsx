import React, { useEffect, useState } from "react";
import { Button, Card, Space, Typography, Row, Col, Grid, Form } from "antd";
import InputComponent from "../../components/InputComponent";
import SelectComponent from "../../components/SelectComponent";
import InputNumberComponent from "../../components/InputNumberComponent";
import SelectMultipleComponent from "../../components/SelectMultipleComponent";
import DateComponent from "../../components/DateComponent";
import EmailInputComponent from "../../components/EmailInputComponent";
import CINInputComponent from "../../components/CINInputComponent";
import PhoneInputComponent from "../../components/PhoneInputComponent";
import { useParams } from "react-router";
import axios from "axios";
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
      id: 52,
      label: "CIN",
      type: 6,
      required: true,
      poids: 10,
    },
    {
      id: 44,
      label: "Téléphone",
      type: 7,
      required: true,
      poids: 10,
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
  const { id } = useParams();
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const [data, setData] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [values, setValues] = useState([])
  const handleSubmit=()=>{
    console.log(values)
    axios
    .post(`http://localhost:8000/api/calcul-resultat/${id}`,values)
    .then((response) => {
        console.log(response.data)
      }
    )
    .catch(() => {
    });
  }
  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [screens]);
  useEffect(()=>{
    axios
    .get(`http://localhost:8000/api/test/${id}`)
    .then((response) => {
        setData(response.data[0]);
        console.log(response.data)        
      }
    )
    .catch(() => {
    });
  },[])
  return (
    <div className="flex justify-center mt-10">
{   data&&   <Card style={{ width: windowWidth > 750 ? 620 : "90%" }}>
        <Title level={3}>{data.label}</Title>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Row gutter={[16]}>
            {data.champs.map((item) => (
              <Col span={24}>
                {
                  item.type_id===3?
                  <SelectComponent champ={item} values={values} setValues={setValues}/>
                  :item.type_id===1?
                  <InputNumberComponent champ={item} values={values} setValues={setValues}/>
                  :item.type_id===4?
                  <SelectMultipleComponent champ={item} values={values} setValues={setValues}/>
                  :item.type_id===2?
                  <DateComponent champ={item} values={values} setValues={setValues}/>
                  :item.type_id===5?
                  <EmailInputComponent champ={item} values={values} setValues={setValues}/>
                  :item.type_id===6?
                  <CINInputComponent champ={item} values={values} setValues={setValues}/>
                  :item.type_id===7?
                  <PhoneInputComponent champ={item} values={values} setValues={setValues}/>
                  :<InputComponent champ={item} values={values} setValues={setValues}/>
                }
              </Col>
          ))}
            <Col className="text-right" span={24}>
            <Form.Item >
              <Space>
                <Button htmlType="reset"> Annuler </Button>
                <Button type="primary" htmlType="submit">
                  {" "}
                  Envoyer{" "}
                </Button>
              </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>}
    </div>
  );
};

export default FormComponent;
