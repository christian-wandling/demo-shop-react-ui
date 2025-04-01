import { UserResponse } from '@demo-shop-react-ui/api';

export interface UserNavigationProps {
  user?: UserResponse;
  onLogin: () => void;
  onLogout: () => void;
  onRegister: () => void;
}
