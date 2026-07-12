# @demo-shop-react-ui/order

This library handles aspects of the order feature including order selection and invoice pdf generation.

## Features

- **Order Management**

  - List orders history of current user

- **Order Details**

  - Comprehensive order information display
  - Product details with images and pricing

- **Invoice Generation**

  - In-browser PDF generation and download

## API Reference

| Export | Kind | Description |
| --- | --- | --- |
| `orderRoutes` | Route config | Mounts the protected order history at `/orders` and the detail view at `/orders/:id`. |

The order store, the status badge and the invoice PDF service are internal to the library and are not part of its public surface.

## Running unit tests

Run `nx test order` to execute the unit tests.
