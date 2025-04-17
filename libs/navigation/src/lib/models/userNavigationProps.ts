import { UserResponse } from '@demo-shop-react-ui/api';

export interface UserNavigationProps {
  user: UserResponse | null;
  className: string;
  'data-testid'?: string;
  onLogin: () => void;
  onLogout: () => void;
  onRegister: () => void;
}
