import { ReactNode } from 'react';
import { NavigationContext } from './NavigationContext';
import { NavigationConfig } from './models/navigationConfig';

export const NavigationProvider = ({
  children,
  navigationConfig,
}: {
  children: ReactNode;
  navigationConfig: NavigationConfig;
}) => {
  return <NavigationContext.Provider value={navigationConfig}>{children}</NavigationContext.Provider>;
};
