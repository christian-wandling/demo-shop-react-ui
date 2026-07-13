# @demo-shop-react-ui/shopping

This library handles all aspects of the shopping feature including product selection, cart management, and the checkout process.

## Features

- **Shopping Cart Management**

  - Add/remove items
  - Update quantities

- **Checkout Process**

  - Address management
  - Order review
  - Order confirmation

## API Reference

| Export | Kind | Description |
| --- | --- | --- |
| `ShoppingCart` | Component | Slide-over cart panel listing the session's items, the total, and the checkout link. Renders nothing while the cart is hidden. |
| `CartIcon` | Component | Cart button showing the current item count; opens the slide-over panel. |
| `useShoppingCartStore` | Store | Cart session state and actions: `fetchCurrentSession`, `add`, `remove`, `updateItemQuantity`, `checkout`, `setShowCart`, plus the `getTotalPrice`, `getItemCount`, `getItemById`, `getItemByProductId` and `hasActiveSession` selectors. |
| `shoppingRoutes` | Route config | Mounts the protected `checkout` route. |

## Running Unit Tests

Run `nx test cart` to execute the unit tests.
