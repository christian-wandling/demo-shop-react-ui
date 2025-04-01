import { ApiContextType } from '../models/apiContextType';
import { Configuration, ConfigurationParameters, OrderApi, ProductApi, ShoppingSessionApi, UserApi } from '../openapi';

let apiInstances: ApiContextType | null = null;

export const initApi = (apiConfig: ConfigurationParameters): ApiContextType => {
  if (apiInstances) return apiInstances;

  const config = new Configuration(apiConfig);

  apiInstances = {
    orderApi: new OrderApi(config),
    productApi: new ProductApi(config),
    shoppingSessionApi: new ShoppingSessionApi(config),
    userApi: new UserApi(config),
  };

  return apiInstances;
};

export const getApi = (): ApiContextType => {
  if (!apiInstances) {
    throw new Error('API service is not initialized. Call `createApis()` first.');
  }
  return apiInstances;
};
