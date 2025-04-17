import { getToken } from '@demo-shop-react-ui/auth';
import { Middleware, RequestContext } from '../openapi';

export const authMiddleware: Middleware = {
  pre: async (context: RequestContext) => {
    const token = getToken();

    return {
      ...context,
      init: {
        ...context.init,
        headers: {
          ...context.init.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    };
  },
};
