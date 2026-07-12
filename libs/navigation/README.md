# @demo-shop-react-ui/navigation

A library providing flexible and customizable navigation elements for modern web applications. This library handles responsive layouts, user-specific navigation

## Features

- **Navigation Configuration**

  - Configurable navigation items
  - Data-driven menu structure with nested items
  - Role-based visibility controls

- **Responsive Navigation**

  - Adaptive layouts for desktop, tablet, and mobile devices
  - Collapsible sidebar for space optimization
  - Touch-friendly mobile navigation drawer

- **User Navigation Section**
  - Providing menu items for available auth actions

## API Reference

| Export | Kind | Description |
| --- | --- | --- |
| `Navigation` | Component | Renders the navigation bar, side navigation and user section from the configuration in context. |
| `NavigationProvider` | Component | Supplies a `NavigationConfig` to the tree. Takes `navigationConfig` and `children`. |
| `NavigationContext` | Context | The `NavigationConfig` context, `null` outside a provider. |
| `NavigationConfig` | Interface | The configuration object: an `items` list of navigation items. |
| `NavigationItem` | Abstract class | Base navigation item: `label`, `order`, an optional `permissionStrategy`, and optional `subItems`. |
| `RouteItem` | Class | A `NavigationItem` that links to a route, adding `route` and an optional `query`. |
| `NavigationItemType` | Enum | The kind of a navigation item. Currently `ROUTE`. |

## Test

Run `nx test navigation` to execute the unit tests.
