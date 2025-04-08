import React from 'react';
import { ContextComposerProps } from '../models/contextComposerProps';

export const ContextComposer: React.FC<ContextComposerProps> = ({ contextProviders, children }) => {
  return contextProviders.reduceRight(
    (_children, { Provider, props = {} }) => <Provider {...props}>{_children}</Provider>,
    children
  );
};
