import React from 'react';
import { ContextComposerProps } from '../models/contextComposerProps';

export const ContextComposer: React.FC<ContextComposerProps> = ({ contextProviders, children }) => {
  return contextProviders.reduceRight(
    (kids, { Provider, props = {} }) => <Provider {...props}>{kids}</Provider>,
    children
  );
};
