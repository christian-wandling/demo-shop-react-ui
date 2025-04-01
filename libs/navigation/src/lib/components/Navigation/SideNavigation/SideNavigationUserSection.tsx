import { UserNavigationProps } from '../../../models/userNavigationProps';

export const SideNavigationUserSection = ({ user, onLogin, onLogout, onRegister }: UserNavigationProps) => {
  if (user) {
    return (
      <div className="lg:hidden space-y-6 border-t border-gray-200 px-4 py-6">
        <div className="flow-root">
          <a className="-m-2 block p-2 font-medium text-xl text-gray-400">
            {user.firstname}&nbsp;{user.lastname}
          </a>
        </div>
        <div className="flow-root">
          <a
            onClick={onLogout}
            className="-m-2 block p-2 font-medium text-xl text-gray-700 hover:text-indigo-500 cursor-pointer">
            Sign out
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:hidden space-y-6 border-t border-gray-200 px-4 py-6">
      <div className="flow-root">
        <a
          onClick={onLogin}
          className="-m-2 block p-2 font-medium text-xl text-gray-700 hover:text-indigo-500 cursor-pointer">
          Sign in
        </a>
      </div>
      <div className="flow-root">
        <a
          onClick={onRegister}
          className="-m-2 block p-2 font-medium text-xl text-gray-700 hover:text-indigo-500 cursor-pointer">
          Register
        </a>
      </div>
    </div>
  );
};
