import { NavigationItem } from './navigationItem';
import { UserResponse } from '@demo-shop-react-ui/api';

export interface NavigationBarProps {
  items: NavigationItem[];
  selectedItem: string;
  user?: UserResponse;
  onOpenSideNavigation: () => void;
  onSelectedItemChange: (item: string) => void;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}
