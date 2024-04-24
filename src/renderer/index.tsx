import React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './components/Layout/Layout';
import { HashRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <Layout />
    </HashRouter>
  </React.StrictMode>
);
