import React, { useEffect, useState } from "react";
import { Button, Card, Space, Typography, Row, Col, Grid, Form, notification, Statistic } from "antd";
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
import TextAreaComponent from "../../components/TextAreaComponent";
import { useTranslation } from "react-i18next";
const { useBreakpoint } = Grid;
const key = 'updatable';

const { Title } = Typography;
const FormComponent = () => {
  const {t} = useTranslation();
  const { id } = useParams();
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const [data, setData] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [values, setValues] = useState([])
  const [api, contextHolder] = notification.useNotification();
  const handleSubmit=()=>{
    console.log(values)
    axios
    .post(`http://localhost:8000/api/calcul-resultat/${id}`,values)
    .then((response) => {
        console.log(response.data)
        api.open({
          key,
          message: 'Votre score est ',
          description:                <Statistic
          value={response.data}
          precision={2}
        />,
          placement:"top",
          duration: 0,
        });
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
      {contextHolder}
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
                  :item.type_id===8?
                  <TextAreaComponent champ={item} values={values} setValues={setValues}/>
                  :<InputComponent champ={item} values={values} setValues={setValues}/>
                }
              </Col>
          ))}
            <Col className="text-right" span={24}>
            <Form.Item >
              <Space>
                <Button htmlType="reset"> {t('Annuler.1')} </Button>
                <Button type="primary" htmlType="submit">
                  {" "}
                  {t('Envoyer.1')}{" "}
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
