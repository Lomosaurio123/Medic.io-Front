import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PacienteContextProvider } from './context/PacienteContext';
import { AuthContextProvider } from './context/AuthContext';
import { BitacoraContextProvider } from './context/BitacoraContext';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <AuthContextProvider>
      <PacienteContextProvider>
        <BitacoraContextProvider>
          <App/>
        </BitacoraContextProvider>
      </PacienteContextProvider>
    </AuthContextProvider>
);

