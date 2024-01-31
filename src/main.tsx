import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { FuctProvider } from './lib';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FuctProvider>
      <App />
    </FuctProvider>
  </React.StrictMode>
);
