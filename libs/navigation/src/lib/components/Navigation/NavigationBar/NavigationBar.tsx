import { Link } from 'react-router';
import { ProductSearch } from '@demo-shop-react-ui/product';
import { NavigationBarProps } from '../../../models/navigationBarProps';
import { RouteItem } from '../../../models/routeItem';
import { NavigationBarUserSection } from './NavigationBarUserSection';

/**
 * NavigationDesktop renders the desktop version of the navigation.
 * It includes the main navigation bar with logo, links, search and cart.
 */
export const NavigationBar = ({
  items,
  selectedItem,
  user,
  onOpenSideNavigation,
  onSelectedItemChange,
  onLogin,
  onRegister,
  onLogout,
}: NavigationBarProps) => {
  return (
    <header className="relative bg-white">
      <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <div className="flex h-16 items-center">
            <button
              onClick={onOpenSideNavigation}
              type="button"
              className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0 h-8 w-8 relative">
              <Link to="/">
                <span className="sr-only">Demo Shop</span>
                <img className="object-contain" src="/icons/demo-shop.png" alt="Demo shop logo" />
              </Link>
            </div>

            {/* Navigation items */}
            <div className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {items.map((item, index) => (
                  <div key={index} className="menu-item flex h-full space-x-8">
                    <Link
                      onClick={() => onSelectedItemChange(item.label)}
                      to={(item as RouteItem).options?.route}
                      className={
                        (selectedItem === item.label ? 'text-indigo-600' : 'text-gray-700') +
                        'menu-item-button flex items-center text-sm font-medium hover:text-indigo-500'
                      }>
                      {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="ml-auto flex items-center">
              <NavigationBarUserSection user={user} onLogin={onLogin} onLogout={onLogout} onRegister={onRegister} />
              <ProductSearch />
              {/*<CartIcon />*/}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
