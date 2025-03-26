import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { NavigationBarUserSection } from './NavigationBarUserSection';
import { UserResponse } from '@demo-shop-react-ui/api';

describe('NavigationBarUserSection', () => {
  const mockUser: UserResponse = {
    email: 'email',
    id: 0,
    phone: null,
    firstname: 'John',
    lastname: 'Doe',
  };

  const mockHandlers = {
    onLogin: vi.fn(),
    onLogout: vi.fn(),
    onRegister: vi.fn(),
  };

  it('renders login and register buttons when user is not logged in', () => {
    render(
      <NavigationBarUserSection
        user={undefined}
        onLogin={mockHandlers.onLogin}
        onLogout={mockHandlers.onLogout}
        onRegister={mockHandlers.onRegister}
      />
    );

    expect(screen.getByText('Sign in')).toBeTruthy();
    expect(screen.getByText('Register')).toBeTruthy();
    expect(screen.queryByText('Sign out')).not.toBeTruthy();
  });

  it('renders user name and logout button when user is logged in', () => {
    render(
      <NavigationBarUserSection
        user={mockUser}
        onLogin={mockHandlers.onLogin}
        onLogout={mockHandlers.onLogout}
        onRegister={mockHandlers.onRegister}
      />
    );

    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('Sign out')).toBeTruthy();
    expect(screen.queryByText('Sign in')).not.toBeTruthy();
    expect(screen.queryByText('Register')).not.toBeTruthy();
  });

  it('calls onLogin when Sign in is clicked', () => {
    render(
      <NavigationBarUserSection
        user={undefined}
        onLogin={mockHandlers.onLogin}
        onLogout={mockHandlers.onLogout}
        onRegister={mockHandlers.onRegister}
      />
    );

    fireEvent.click(screen.getByText('Sign in'));
    expect(mockHandlers.onLogin).toHaveBeenCalledTimes(1);
  });

  it('calls onRegister when Register is clicked', () => {
    render(
      <NavigationBarUserSection
        user={undefined}
        onLogin={mockHandlers.onLogin}
        onLogout={mockHandlers.onLogout}
        onRegister={mockHandlers.onRegister}
      />
    );

    fireEvent.click(screen.getByText('Register'));
    expect(mockHandlers.onRegister).toHaveBeenCalledTimes(1);
  });

  it('calls onLogout when Sign out is clicked', () => {
    render(
      <NavigationBarUserSection
        user={mockUser}
        onLogin={mockHandlers.onLogin}
        onLogout={mockHandlers.onLogout}
        onRegister={mockHandlers.onRegister}
      />
    );

    fireEvent.click(screen.getByText('Sign out'));
    expect(mockHandlers.onLogout).toHaveBeenCalledTimes(1);
  });

  it('displays the correct user name format', () => {
    render(
      <NavigationBarUserSection
        user={{ ...mockUser, firstname: 'Jane', lastname: 'Smith' }}
        onLogin={mockHandlers.onLogin}
        onLogout={mockHandlers.onLogout}
        onRegister={mockHandlers.onRegister}
      />
    );

    expect(screen.getByText('Jane Smith')).toBeTruthy();
  });

  describe('Snapshots', () => {
    it('matches the snapshot logged out state', () => {
      const { baseElement } = render(
        <NavigationBarUserSection
          user={undefined}
          onLogin={mockHandlers.onLogin}
          onLogout={mockHandlers.onLogout}
          onRegister={mockHandlers.onRegister}
        />
      );

      expect(baseElement.firstChild).toMatchSnapshot();
    });

    it('matches the snapshot logged in state', () => {
      const { baseElement } = render(
        <NavigationBarUserSection
          user={mockUser}
          onLogin={mockHandlers.onLogin}
          onLogout={mockHandlers.onLogout}
          onRegister={mockHandlers.onRegister}
        />
      );

      expect(baseElement.firstChild).toMatchSnapshot();
    });
  });
});
