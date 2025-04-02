import { UserResponse } from '@demo-shop-react-ui/api';

export interface UserNavigationProps {
  user: UserResponse | null;
  onLogin: () => void;
  onLogout: () => void;
  onRegister: () => void;
}
