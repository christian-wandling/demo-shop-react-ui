import React, { ComponentType, ReactNode } from 'react';

interface ContextComposerProps {
  contextProviders: Array<{ Provider: ComponentType<any>; props?: Record<string, any> }>;
  children: ReactNode;
}

const ContextComposer: React.FC<ContextComposerProps> = ({ contextProviders, children }) => {
  return contextProviders.reduceRight(
    (kids, { Provider, props = {} }) => <Provider {...props}>{kids}</Provider>,
    children
  );
};

export default ContextComposer;
