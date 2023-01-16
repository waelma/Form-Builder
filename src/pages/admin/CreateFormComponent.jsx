import React, { useEffect, useState } from "react";
import { Button, Card, Space, Typography, Row, Col, Grid, Form, Alert } from "antd";
import InputComponent from "../../components/InputComponent";
import SelectComponent from "../../components/SelectComponent";
import { PlusOutlined, SettingOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import CreateChamp from "./CreateChamp";
import DetailChamp from "./DetailChamp";
import InputNumberComponent from "../../components/InputNumberComponent";
import SelectMultipleComponent from "../../components/SelectMultipleComponent";
import DateComponent from "../../components/DateComponent";
import EmailInputComponent from "../../components/EmailInputComponent";
import CINInputComponent from "../../components/CINInputComponent";
import PhoneInputComponent from "../../components/PhoneInputComponent";
import axios from "axios";
import TextAreaComponent from "../../components/TextAreaComponent";
import { useTranslation } from "react-i18next";
const { useBreakpoint } = Grid;
const { Title } = Typography;
const CreateFormComponent = () => {
  const {t} = useTranslation();
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const [champs, setChamps] = useState([
    {
      id:0,
      label: localStorage.getItem('lang')==="fr"?"prenom":localStorage.getItem('lang')==="ar"?"الإ سم":"first name",
      type: 0,
      required: true,
      poids:10,
      items:[],
      formules:[]
    },
    {
      id:1,
      label: localStorage.getItem('lang')==="fr"?"nom":localStorage.getItem('lang')==="ar"?"اللقب":"Last name",
      type: 0,
      required: true,
      poids:10,
      items:[],
      formules:[]
    },
    {
      id:2,
      label: localStorage.getItem('lang')==="fr"?"Email":localStorage.getItem('lang')==="ar"?"البريد إلكتروني":"Email",
      type: 5,
      required: true,
      poids:20,
      items:[],
      formules:[]
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [champ, setChamp] = useState({})
  const [formTitle, setFormTitle] = useState(localStorage.getItem('lang')==="fr"?"Titre de formulaire":localStorage.getItem('lang')==="ar"?"عنوان الإستمارة":"Form title")
  const [alert, setAlert] = useState(false)
  const handleCreateForm=()=>{
      let s = 0;
      champs.map((item) => {
        s += item.poids;
      });
    if(s===100){
      axios
      .post(`http://localhost:8000/api/test`,{label:formTitle,champs:champs})
      .then((response) => {
          console.log(response.data);
        }
      )
      .catch(() => {
      });
    }else{
      handleAlert()
    }

  }
  const handleAlert=()=>{
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 8000);
  }
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
      <Button onClick={handleCreateForm} className="mb-5" icon={<SaveOutlined />} > {t('Enregistrer.1')} </Button>
      {alert&&<Alert message={<>{t('Alert message.1')}</>} type="warning" className="mb-5" />}
        <Title level={3} className="hey"
        editable={{
          onChange:setFormTitle,
          text: formTitle,
          icon:<EditOutlined style={{width:"20px"}}/>
        }}
        >{formTitle}</Title>
        <Form layout="vertical" form={form} onFinish={()=>{}}>
        <Row gutter={[16]}>
          {champs.map((item) => (
            <>
              <Col span={22}>
                {
                  item.type===3?
                  <SelectComponent champ={item} />
                  :item.type===1?
                  <InputNumberComponent champ={item} />
                  :item.type===4?
                  <SelectMultipleComponent champ={item}/>
                  :item.type===2?
                  <DateComponent champ={item}/>
                  :item.type===5?
                  <EmailInputComponent champ={item}/>
                  :item.type===6?
                  <CINInputComponent champ={item}/>
                  :item.type===7?
                  <PhoneInputComponent champ={item}/>
                  :item.type===8?
                  <TextAreaComponent champ={item}/>
                  :<InputComponent champ={item} />
                }
              </Col>
              <Col span={2} style={{ position: "relative" }}>
                <SettingOutlined
                  onClick={() => {setChamp(item);setIsModalDetailOpen(true)}}
                  style={{
                    fontSize: "18px",
                    margin: "0",
                    position: "absolute",
                    top: "30%",
                    msTransform: "translateY(-50%)",
                    transform: "translateY(-50%)",
                  }}
                />
              </Col>
            </>
          ))}
          <Col span={24} className="mb-5">
            <Button
              className="w-full"
              type="dashed"
              onClick={() => setIsModalOpen(true)}
            >
              {" "}
              <PlusOutlined /> {t('Ajouter un champ.1')}{" "}
            </Button>
          </Col>
          <Col className="text-right" span={24}>
            <Space>
              <Button> {t('Annuler.1')} </Button>
              <Button type="primary" htmlType="submit"> {t('Envoyer.1')} </Button>
            </Space>
          </Col>
        </Row>
        </Form>
      </Card>
      <CreateChamp
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        champs={champs}
        setChamps={setChamps}
      />
      <DetailChamp         
        isModalOpen={isModalDetailOpen}
        setIsModalOpen={setIsModalDetailOpen} 
        champ={champ}
        champs={champs}
        setChamps={setChamps}
      />
    </div>
  );
};

export default CreateFormComponent;
