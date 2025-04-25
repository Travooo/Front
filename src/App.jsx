import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './FrontHome/page';
import LoginUser from './FrontLoginUser/pgLoginUser';
import PgLoginAdm from './FrontPgPrincipal/pgLoginAdm';
import PgEditLoginAdm from './FrontPgPrincipal/pgEditLoginAdm';
import Servicos from './meus-servicos/page';
<<<<<<< Updated upstream
import PgCupons from './FrontCupons/pgCupons';

import CadastrarLocal from './cadastrar-local/page';
=======
import CuponsPage from './FrontPgCupons/cuponsPage';
>>>>>>> Stashed changes
import './styles/tailwind.css';



function App() {
  return (
    <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/loginUser" element={<LoginUser />} />
          <Route path="/travoo" element={<PgLoginAdm />} />
          <Route path="/travoo/edit" element={<PgEditLoginAdm />} />
          <Route path="/meus-servicos" element={<Servicos />} />
<<<<<<< Updated upstream
          <Route path="/cupons" element={<PgCupons />} />
          <Route path="/cadastrar-local" element={<CadastrarLocal />} />
=======
          <Route path="/meus-cupons" element={<CuponsPage />} />
>>>>>>> Stashed changes
        </Routes>
    </Router>
  );
}

export default App;

