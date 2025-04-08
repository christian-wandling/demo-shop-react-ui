import { render } from '@testing-library/react';

import AppRouter from './AppRouter';

describe('AppRouter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppRouter />);
    expect(baseElement).toBeTruthy();
  });
});
