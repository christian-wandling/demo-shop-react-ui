import { useContext, useEffect, useState } from 'react';
import { NavigationBar } from './NavigationBar/NavigationBar';
import { SideNavigation } from './SideNavigation/SideNavigation';
import { getFilteredNavigationItems } from '../../services/navigationService';
import { NavigationItemType } from '../../enums/navigationItemType';
import { NavigationContext } from '../../NavigationContext';
import { login, logout, register } from '@demo-shop-react-ui/auth';
import { useUserStore } from '@demo-shop-react-ui/user';

/**
 * NavigationContainer is responsible for managing state and data for the navigation components.
 * It renders different navigation components based on screen size.
 */
export const Navigation = () => {
  const config = useContext(NavigationContext);
  const user = useUserStore(state => state.user);

  const [sideNavigationOpen, setSideNavigationOpen] = useState(false);
  const [selectedNavigationItem, setSelectedNavigationItem] = useState('products');
  const navigationItems = getFilteredNavigationItems(config?.items ?? [], NavigationItemType.ROUTE);

  useEffect(() => {
    const handleResize = () => setSideNavigationOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Handles user login and loads shopping session
   */
  const handleLogin = async () => {
    await login();
    // await cart.loadShoppingSession();
  };

  /**
   * Handles user registration and loads shopping session
   */
  const handleRegister = async () => {
    await register();
    // await cart.loadShoppingSession();
  };

  /**
   * Handles user logout
   */
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="bg-white">
      <NavigationBar
        items={navigationItems}
        selectedItem={selectedNavigationItem}
        user={user}
        onOpenSideNavigation={() => setSideNavigationOpen(true)}
        onSelectedItemChange={(item: string) => setSelectedNavigationItem(item)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
      />
      {sideNavigationOpen && (
        <SideNavigation
          items={navigationItems}
          selectedItem={selectedNavigationItem}
          user={user}
          isOpen={sideNavigationOpen}
          onSetOpen={open => setSideNavigationOpen(open)}
          onSelectedItemChange={(item: string) => setSelectedNavigationItem(item)}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};
