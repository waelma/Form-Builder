import { ConfigProvider } from "antd";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import enFR from 'antd/lib/locale/fr_FR';
import CreateFormComponent from './pages/admin/CreateFormComponent'
import FormComponent from './pages/condidat/FormComponent'

function App() {
  return (
    <ConfigProvider direction="ltr" locale={enFR} >
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
