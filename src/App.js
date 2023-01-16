import { ConfigProvider } from "antd";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import enFR from 'antd/lib/locale/fr_FR';
import enAR from 'antd/lib/locale/ar_EG';
import enEN from 'antd/lib/locale/en_US';

import CreateFormComponent from './pages/admin/CreateFormComponent'
import FormComponent from './pages/condidat/FormComponent'
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function App() {
  const {i18n} = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang'))
  }, [])
  
  return (
    <ConfigProvider direction={localStorage.getItem('lang')==="ar"?"rtl":"ltr"} locale={localStorage.getItem('lang')==="fr"?enFR:localStorage.getItem('lang')==="ar"?enAR:enEN} >
    <BrowserRouter>
    <Routes>
    <Route path={`*`} element={<CreateFormComponent/>} />
    <Route path={`affiche-form/:id`} element={<FormComponent/>} />
    </Routes>
  </BrowserRouter>
  </ConfigProvider>
  );
}

export default App;
