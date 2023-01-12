import React, { useEffect, useState } from "react";
import { Button, Card, Space, Typography, Row, Col, Grid, Form } from "antd";
import InputComponent from "../../components/InputComponent";
import SelectComponent from "../../components/SelectComponent";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import CreateChamp from "./CreateChamp";
import DetailChamp from "./DetailChamp";
import InputNumberComponent from "../../components/InputNumberComponent";
import SelectMultipleComponent from "../../components/SelectMultipleComponent";
import DateComponent from "../../components/DateComponent";

const { useBreakpoint } = Grid;
const { Title } = Typography;
const CreateFormComponent = () => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const [champs, setChamps] = useState([
    {
      id:0,
      label: "Nom",
      type: 0,
      required: true,
      poids:10,
    },
    {
      id:1,
      label: "Prenom",
      type: 0,
      required: true,
      poids:10,
    },
    {
      id:2,
      label: "Email",
      type: 5,
      required: true,
      poids:20,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [champ, setChamp] = useState({})
  const [formTitle, setFormTitle] = useState("Form")
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
        <Title level={3} className="hey"
        editable={{
          onChange:setFormTitle,
          text: formTitle,
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
              <PlusOutlined /> Ajouter un champ{" "}
            </Button>
          </Col>
          <Col className="text-right" span={24}>
            <Space>
              <Button> Annuler </Button>
              <Button type="primary" htmlType="submit"> Envoyer </Button>
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
