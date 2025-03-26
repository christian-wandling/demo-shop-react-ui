import { NavigationItem } from './navigationItem';
import { UserResponse } from '@demo-shop-react-ui/api';

export interface SideNavigationProps {
  items: NavigationItem[];
  selectedItem: string;
  user: UserResponse | null;
  isOpen: boolean;
  onSetOpen: (isOpen: boolean) => void;
  onSelectedItemChange: (item: string) => void;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}
