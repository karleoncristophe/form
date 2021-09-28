import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
   <BrowserRouter>
      <ConfigProvider locale={ptBR}>
         <App />
      </ConfigProvider>
   </BrowserRouter>,
   document.getElementById('root')
);
