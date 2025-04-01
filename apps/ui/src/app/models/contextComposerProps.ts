import { ComponentType, ReactNode } from 'react';

export interface ContextComposerProps {
  contextProviders: Array<{ Provider: ComponentType<any>; props?: Record<string, any> }>;
  children: ReactNode;
}
