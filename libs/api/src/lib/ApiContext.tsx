import { createContext } from 'react';
import { ApiContextType } from './models/apiContextType';

export const ApiContext = createContext<ApiContextType | null>(null);
