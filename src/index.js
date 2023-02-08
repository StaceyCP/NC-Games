import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LoggedInProvider } from './contexts/LoggedIn';
import { ReviewsProvider } from './contexts/ReviewsContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoggedInProvider>
        <ReviewsProvider>
          <App />
        </ReviewsProvider>
      </LoggedInProvider>
    </BrowserRouter>
  </React.StrictMode>
);
