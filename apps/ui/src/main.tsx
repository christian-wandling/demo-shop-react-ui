import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { BrowserRouter } from 'react-router';
import { initApi } from '@demo-shop-react-ui/api';
import { apiConfig } from './app/config/config';

initApi(apiConfig);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
