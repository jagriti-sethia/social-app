import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import AuthProvider from "./contexts/authcontext";
import DataProvider from "./contexts/datacontext";


import { makeServer } from "./server";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <AuthProvider>
        <DataProvider>
    <App />
    </DataProvider>
      </AuthProvider>
    </Router>
   
  </React.StrictMode>
);

