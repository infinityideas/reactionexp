import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Exp from './Exp';
import Practice from './Practice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/exp" element={<Exp type="exp"/>}/>
        <Route path="/practice" element={<Practice />}/>
        <Route path="/practice_exp" element={<Exp type="practice" />}/>
        <Route path="/practice_ne" element={<Exp type="ne" />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
