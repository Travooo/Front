import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './FrontHome/page';
import './styles/tailwind.css';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
        </Routes>
    </Router>
  );
}

export default App;

