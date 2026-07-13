# @demo-shop-react-ui/product

A library for product management. It enables displaying and filtering the product catalog and add them to the shopping cart.

## Features

- **Product Catalog**

  - Response grid view of product items

- **Product Details**

  - Detailed product information

- **Shopping Integration**

  - One-click add to cart functionality

- **Product Filtering**

  - Realtime full text search filter
  - Supports text and category filtering

## API Reference

| Export | Kind | Description |
| --- | --- | --- |
| `ProductSearch` | Component | Search input bound to the catalog's name filter; navigates to the product list on submit. |
| `productRoutes` | Route config | Mounts the product list at `/products` and the detail view at `/products/:id`. |

## Running unit tests

Run `nx test product` to execute the unit tests.
