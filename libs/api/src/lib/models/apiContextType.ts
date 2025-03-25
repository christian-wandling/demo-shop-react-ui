import { OrderApi, ProductApi, ShoppingSessionApi, UserApi } from '../openapi';

export type ApiContextType = {
  orderApi: OrderApi;
  productApi: ProductApi;
  shoppingSessionApi: ShoppingSessionApi;
  userApi: UserApi;
};
