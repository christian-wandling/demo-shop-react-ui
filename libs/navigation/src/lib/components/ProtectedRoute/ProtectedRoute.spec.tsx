import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { ProtectedRoute } from './ProtectedRoute';
import { hasPermission, PermissionStrategy } from '@demo-shop-react-ui/auth';

vi.mock('@demo-shop-react-ui/auth', () => ({
  hasPermission: vi.fn(),
  PermissionStrategy: {
    AUTHENTICATED: 'authenticated',
  },
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    Navigate: vi.fn(() => null),
  };
});

describe('ProtectedRoute', () => {
  const HomePage = () => <div>Home Page</div>;
  const ProtectedPage = () => <div>Protected Content</div>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render child routes when user is authenticated', () => {
    vi.mocked(hasPermission).mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<ProtectedPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeTruthy();

    expect(hasPermission).toHaveBeenCalledWith(PermissionStrategy.AUTHENTICATED);
  });

  it('should redirect to home page when user is not authenticated', () => {
    vi.mocked(hasPermission).mockReturnValue(false);

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<ProtectedPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Protected Content')).not.toBeTruthy();
  });
});
