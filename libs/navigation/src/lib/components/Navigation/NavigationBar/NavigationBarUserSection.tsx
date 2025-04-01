import { UserNavigationProps } from '../../../models/userNavigationProps';

export const NavigationBarUserSection = ({ user, onLogin, onLogout, onRegister }: UserNavigationProps) => {
  if (user) {
    return (
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
        <a className="text-sm font-medium text-gray-700  cursor-pointer">
          {user.firstname}&nbsp;{user.lastname}
        </a>
        <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
        <a onClick={onLogout} className="text-sm font-medium text-gray-700 hover:text-indigo-500 cursor-pointer">
          Sign out
        </a>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
      <a onClick={onLogin} className="text-sm font-medium text-gray-700 hover:text-indigo-500 cursor-pointer">
        Sign in
      </a>
      <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
      <a onClick={onRegister} className="text-sm font-medium text-gray-700 hover:text-indigo-500 cursor-pointer">
        Register
      </a>
    </div>
  );
};
