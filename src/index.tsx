import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Exp from './Exp';
import Practice from './Practice';
import BaselineIndex from './baseline/index';

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

        <Route path="/baseline" element={<BaselineIndex />}/>
        <Route path="/baseline/st1" element={<Exp type="baseline1" />}/>
        <Route path="/baseline/st2" element={<Exp type="baseline2" />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
