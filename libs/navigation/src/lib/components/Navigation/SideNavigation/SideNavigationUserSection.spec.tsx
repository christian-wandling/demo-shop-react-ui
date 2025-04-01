import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SideNavigationUserSection } from './SideNavigationUserSection';
import { UserResponse } from '@demo-shop-react-ui/api';

describe('SmallScreenUserNavigation', () => {
  const mockOnLogin = vi.fn();
  const mockOnLogout = vi.fn();
  const mockOnRegister = vi.fn();

  const mockUser: UserResponse = {
    email: 'email',
    id: 1,
    phone: null,
    firstname: 'John',
    lastname: 'Doe',
  };

  it('renders successfully', () => {
    const { baseElement } = render(
      <SideNavigationUserSection onLogin={mockOnLogin} onLogout={mockOnLogout} onRegister={mockOnRegister} />
    );

    expect(baseElement).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { baseElement } = render(
      <SideNavigationUserSection onLogin={mockOnLogin} onLogout={mockOnLogout} onRegister={mockOnRegister} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('renders login and register options when user is not logged in', () => {
    render(<SideNavigationUserSection onLogin={mockOnLogin} onLogout={mockOnLogout} onRegister={mockOnRegister} />);

    expect(screen.getByText('Sign in')).toBeTruthy();
    expect(screen.getByText('Register')).toBeTruthy();
    expect(screen.queryByText('Sign out')).not.toBeTruthy();
  });

  it('renders user name and logout option when user is logged in', () => {
    render(
      <SideNavigationUserSection
        user={mockUser}
        onLogin={mockOnLogin}
        onLogout={mockOnLogout}
        onRegister={mockOnRegister}
      />
    );

    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('Sign out')).toBeTruthy();
    expect(screen.queryByText('Sign in')).not.toBeTruthy();
    expect(screen.queryByText('Register')).not.toBeTruthy();
  });

  it('calls onLogin when Sign in is clicked', () => {
    render(<SideNavigationUserSection onLogin={mockOnLogin} onLogout={mockOnLogout} onRegister={mockOnRegister} />);

    fireEvent.click(screen.getByText('Sign in'));
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
  });

  it('calls onRegister when Register is clicked', () => {
    render(<SideNavigationUserSection onLogin={mockOnLogin} onLogout={mockOnLogout} onRegister={mockOnRegister} />);

    fireEvent.click(screen.getByText('Register'));
    expect(mockOnRegister).toHaveBeenCalledTimes(1);
  });

  it('calls onLogout when Sign out is clicked', () => {
    render(
      <SideNavigationUserSection
        user={mockUser}
        onLogin={mockOnLogin}
        onLogout={mockOnLogout}
        onRegister={mockOnRegister}
      />
    );

    fireEvent.click(screen.getByText('Sign out'));
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it('renders with correct CSS classes for mobile view', () => {
    const { container } = render(
      <SideNavigationUserSection onLogin={mockOnLogin} onLogout={mockOnLogout} onRegister={mockOnRegister} />
    );

    const navContainer = container.firstChild as HTMLElement;
    expect(navContainer.classList).toContain('lg:hidden');
    expect(navContainer.classList).toContain('border-t');
    expect(navContainer.classList).toContain('border-gray-200');
  });

  it('formats the user name correctly when user is logged in', () => {
    render(
      <SideNavigationUserSection
        user={mockUser}
        onLogin={mockOnLogin}
        onLogout={mockOnLogout}
        onRegister={mockOnRegister}
      />
    );

    expect(screen.getByText('John Doe')).toBeTruthy();
  });
});
