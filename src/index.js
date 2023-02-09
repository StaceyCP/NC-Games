import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LoggedInProvider } from './contexts/LoggedIn';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoggedInProvider>
        <App />
      </LoggedInProvider>
    </BrowserRouter>
  </React.StrictMode>
);
