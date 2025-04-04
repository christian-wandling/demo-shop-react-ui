import { Link } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { SideNavigationProps } from '../../../models/sideNavigationProps';
import { RouteItem } from '../../../models/routeItem';
import { SideNavigationUserSection } from './SideNavigationUserSection';

/**
 * NavigationMobile renders the mobile version of the navigation.
 * It includes a slide-over menu with links and user navigation.
 */
export const SideNavigation = ({
  user,
  items,
  selectedItem,
  isOpen,
  onSetOpen,
  onSelectedItemChange,
  onLogin,
  onRegister,
  onLogout,
}: SideNavigationProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.dialog
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onSetOpen(false)}
            onKeyDown={e => e.key === 'Escape' && onSetOpen(false)}
            className="relative flex z-40 lg:hidden"
            aria-modal="true">
            <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" data-testid="dialog"></div>
          </motion.dialog>

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween' }}
            className="fixed h-screen top-0 z-40 flex w-full max-w-xs flex-col overflow-y-auto bg-white px-6 p-2 shadow-xl">
            <div className="sticky z-20 top-0 flex px-4 pb-2 pt-5">
              <button
                onClick={() => onSetOpen(false)}
                type="button"
                className="relative opacity-90 -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 bg-white">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 space-y-6 border-t border-gray-200 px-4 py-6">
              {items.map((item, index) => (
                <div key={index} className="flow-root">
                  <Link
                    to={(item as RouteItem).options?.route}
                    onClick={() => {
                      onSetOpen(false);
                      onSelectedItemChange(item.label);
                    }}
                    className={
                      (selectedItem === item.label ? 'text-indigo-600' : 'text-gray-700') +
                      '-m-2 block p-2 font-medium text-gray-700 hover:text-indigo-500 text-xl'
                    }>
                    {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                  </Link>
                </div>
              ))}
            </div>

            <SideNavigationUserSection user={user} onLogin={onLogin} onRegister={onRegister} onLogout={onLogout} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
