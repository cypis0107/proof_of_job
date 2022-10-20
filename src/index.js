import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider as ReduxProvider } from 'react-redux';
//import { Provider } from '@self.id/framework'

import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    {/* <ProviderCeramic client={{ ceramic: 'testnet-clay' }}> */}
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
    {/* </ProviderCeramic> */}
  </React.StrictMode>
);

