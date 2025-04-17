import { UserNavigationProps } from '../../../models/userNavigationProps';

export const UserNavigation = ({
  user,
  onLogin,
  onLogout,
  onRegister,
  className,
  'data-testid': dataTestId,
}: UserNavigationProps) => {
  if (user) {
    return (
      <div className={className} data-testid={dataTestId}>
        <div
          className="block -m-2 lg:m-0 p-2 lg:p-0 font-medium text-xl lg:text-sm text-gray-400"
          data-testid="user-navigation-name">
          {user.firstname}&nbsp;{user.lastname}
        </div>
        <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
        <div
          onClick={onLogout}
          className="block -m-2 lg:m-0 p-2 lg:p-0 font-medium text-xl lg:text-sm lg:hover:text-indigo-500 cursor-pointer"
          data-testid="user-navigation-sign-out">
          Sign out
        </div>
      </div>
    );
  }

  return (
    <div className={className} data-testid={dataTestId}>
      <div
        onClick={onLogin}
        className="block -m-2 lg:m-0 p-2 lg:p-0 font-medium text-xl lg:text-sm lg:hover:text-indigo-500 cursor-pointer"
        data-testid="user-navigation-sign-in">
        Sign in
      </div>
      <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
      <div
        onClick={onRegister}
        className="block -m-2 lg:m-0 p-2 lg:p-0 font-medium text-xl lg:text-sm lg:hover:text-indigo-500 cursor-pointer"
        data-testid="user-navigation-register">
        Register
      </div>
    </div>
  );
};
