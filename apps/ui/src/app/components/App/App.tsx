import { ContextComposer } from '../../utils/ContextComposer';
import { ApiProvider } from '@demo-shop-react-ui/api';
import { apiConfig, navigationConfig } from '../../config/config';
import { Navigation, NavigationProvider } from '@demo-shop-react-ui/navigation';
import { useAppStore } from '../../+state/useAppStore';
import { useEffect, useRef } from 'react';
import { ShoppingCart } from '@demo-shop-react-ui/shopping';
import { LoadingSpinner } from '@demo-shop-react-ui/shared';
import { AppRouter } from '../AppRouter/AppRouter';

export const App = () => {
  const isInitialized = useAppStore(state => state.isInitialized);
  const initialize = useAppStore(state => state.initialize);

  const initRef = useRef(false);
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      initialize();
    }
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

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <ContextComposer contextProviders={providers}>
        <ShoppingCart />
        <Navigation />
        <AppRouter />
      </ContextComposer>
    </div>
  );
};
