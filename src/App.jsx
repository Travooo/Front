import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './home/page';
import LoginUser from './FrontLoginUser/pgLoginUser';
import Dashboard from './painel/page';
import PgEditLoginAdm from './editar-perfil/page';
import Servicos from './meus-servicos/page';
import PgCupons from './FrontCupons/pgCupons';
import PerfilEstabelecimento from './perfilEstabelecimento/localPage';

import CadastrarLocal from './cadastrar-local/page';
import CuponsPage from './FrontPgCupons/cuponsPage';
import RegisterPage from './registro/page';
import './styles/tailwind.css';



function App() {
  return (
    <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/loginUser" element={<LoginUser />} />
          <Route path="/painel" element={<Dashboard />} />
          <Route path="/editar-perfil" element={<PgEditLoginAdm />} />
          <Route path="/meus-servicos" element={<Servicos />} />
          <Route path="/cupons" element={<PgCupons />} />
          <Route path="/cadastrar-local" element={<CadastrarLocal />} />
          <Route path="/meus-cupons" element={<CuponsPage />} />
          <Route path="/perfil-estabelecimento" element={<PerfilEstabelecimento />} />
          <Route path="/registro" element={<RegisterPage />} />
        </Routes>
    </Router>
  );
}

export default App;

