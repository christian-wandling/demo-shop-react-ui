import { useContext } from 'react';
import { NavigationContext } from '../NavigationContext';
import { NavigationConfig } from '../models/navigationConfig';

export const useNavigation = (): NavigationConfig => {
  const config = useContext(NavigationContext);
  if (!config) {
    throw new Error('useNavigation must be used within an ApiConfigProvider');
  }
  return config;
};
