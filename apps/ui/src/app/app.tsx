import { ProductDetail, ProductList } from '@demo-shop-react-ui/product';
import { Navigate, Route, Routes } from 'react-router';
import { initAuth } from '@demo-shop-react-ui/auth';
import ContextComposer from './utils/ContextComposer';
import { ApiProvider } from '@demo-shop-react-ui/api';
import { apiConfig, authConfig, navigationConfig } from './config/config';
import { useEffect } from 'react';
import { NavigationProvider } from '@demo-shop-react-ui/navigation';

export function App() {
  useEffect(() => {
    async function init() {
      await initAuth(authConfig);
    }

    init();
  }, []);

  const providers = [
    {
      Provider: ApiProvider,
      props: { apiConfig },
    },
    {
      Provider: NavigationProvider,
      props: { navigationConfig },
    },
  ];

  return (
    <div>
      <ContextComposer contextProviders={providers}>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </ContextComposer>
    </div>
  );
}

export default App;
