import { ReactNode } from 'react';
import { ConfigurationParameters } from './openapi';
import { ApiContext } from './ApiContext';
import { initApi } from './services/apiService';

export const ApiProvider = ({ children, apiConfig }: { children: ReactNode; apiConfig: ConfigurationParameters }) => {
  const apis = initApi(apiConfig);

  return <ApiContext.Provider value={apis}>{children}</ApiContext.Provider>;
};
