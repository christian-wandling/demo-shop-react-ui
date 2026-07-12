# @demo-shop-react-ui/auth

Authentication and authorization library built on Keycloak for React applications. This library provides a comprehensive solution for securing your application with role-based access control and seamless authentication flows.
Features

## Features

- **Keycloak Integration**

  - SSO (Single Sign-On) support
  - OAuth2/OpenID Connect compliant
  - Session timeout handling
  - Token refresh handling
  - Role-based route protection

## API Reference

| Export | Kind | Description |
| --- | --- | --- |
| `initKeycloak(authConfig)` | Function | Initialises the Keycloak adapter from an `AuthConfig`; resolves to the authenticated state. |
| `login()` | Function | Redirects to the Keycloak login flow. |
| `logout()` | Function | Redirects to the Keycloak logout flow. |
| `register()` | Function | Redirects to the Keycloak registration flow. |
| `isAuthenticated()` | Function | Whether a session is currently authenticated. |
| `getToken()` | Function | The current access token, or `undefined` when there is no session. |
| `hasPermission(strategy, ...args)` | Function | Evaluates a `PermissionStrategy` against the current session. |
| `PermissionStrategy` | Enum | The permission strategies a route or item can require. Currently `AUTHENTICATED`. |
| `PERMISSION_STRATEGIES` | Constant | Maps each `PermissionStrategy` to the predicate that decides it. |
| `AuthConfig` | Interface | Keycloak connection settings: `url`, `realm`, `clientId`. |

## Running unit tests

Run `nx test auth` to execute the unit tests.
