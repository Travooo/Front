import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './home/page';
import Home from './home_google_maps_beta/page';
import LoginUser from './login/pgLoginUser';
import Dashboard from './painel/page';
import PgEditLoginAdm from './editar-perfil/page';
import Servicos from './meus-servicos/page';
import PgCupons from './FrontCupons/pgCupons';
import PerfilEstabelecimento from './perfilEstabelecimento/localPage';
import EditarServico from './editar-servico/EditarServico';
import CadastrarLocal from './cadastrar-local/page';
import CuponsPage from './FrontPgCupons/cuponsPage';
import RegisterPage from './registro/page';
import DashboardAdmin from './dashboard/page';
import './styles/tailwind.css';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home-beta" element={<Home/>} />
          <Route path="/loginUser" element={<LoginUser />} />
          <Route path="/registerUser" element={<RegisterPage />} />
          <Route path="/painel" element={<Dashboard />} />
          <Route path="/editar-perfil" element={<PgEditLoginAdm />} />
          <Route path="/meus-servicos" element={<Servicos />} />
          <Route path="/cupons" element={<PgCupons />} />
          <Route path="/cadastrar-local" element={<CadastrarLocal />} />
          <Route path="/meus-cupons" element={<CuponsPage />} />
          <Route path="/perfil-estabelecimento/:id" element={<PerfilEstabelecimento />} />
          <Route path="/editar-servico" element={<EditarServico />} />
          <Route path="/dashboard" element={<DashboardAdmin />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

