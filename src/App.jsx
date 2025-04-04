import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './FrontHome/page';
import LoginUser from './FrontLoginUser/pgLoginUser';
import PgLoginAdm from './FrontPgPrincipal/pgLoginAdm';
import PgEditLoginAdm from './FrontPgPrincipal/pgEditLoginAdm';
import Servicos from './meus-servicos/page';

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
        </Routes>
    </Router>
  );
}

export default App;

