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
        <Route path="/exp" element={<Exp />}/>
        <Route path="/practice" element={<Practice />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
