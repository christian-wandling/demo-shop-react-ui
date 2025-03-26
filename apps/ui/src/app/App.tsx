import { ProductDetail, ProductList } from '@demo-shop-react-ui/product';
import { Navigate, Route, Routes } from 'react-router';
import { initKeycloak } from '@demo-shop-react-ui/auth';
import { ContextComposer } from './utils/ContextComposer';
import { ApiProvider } from '@demo-shop-react-ui/api';
import { apiConfig, authConfig, navigationConfig } from './config/config';
import { useEffect } from 'react';
import { Navigation, NavigationProvider } from '@demo-shop-react-ui/navigation';

export const App = () => {
  useEffect(() => {
    async function init() {
      await initKeycloak(authConfig);
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
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </ContextComposer>
    </div>
  );
};
