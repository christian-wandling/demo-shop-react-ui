import { createContext } from 'react';
import { NavigationConfig } from './models/navigationConfig';

export const NavigationContext = createContext<NavigationConfig | null>(null);
