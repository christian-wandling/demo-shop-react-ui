# DemoShop React UI

A frontend e-commerce application built for educational purposes using React.

this frontend is compatible with the api found in these projects:

Full stack project using Angular and NestJS

> <a href="http://github.com/christian-wandling/demo-shop-public" target="_blank">http://github.com/christian-wandling/demo-shop-public</a>

Api using ASP.NET Core

> <a href="http://github.com/christian-wandling/demo-shop-dotnet-api" target="_blank">http://github.com/christian-wandling/demo-shop-dotnet-api</a>

## Overview

### Libraries

- [Authentication](https://github.com/christian-wandling/demo-shop-react-ui/tree/main/libs/auth/README.md) - User authentication and authorization flows
- [User](https://github.com/christian-wandling/demo-shop-react-ui/tree/main/libs/user/README.md) - User management
- [Products](https://github.com/christian-wandling/demo-shop-react-ui/tree/main/libs/product/README.md) - Product catalog, categories, and search functionality
- [Shopping](https://github.com/christian-wandling/demo-shop-react-ui/tree/main/libs/shopping/README.md) - Shopping cart implementation and session management
- [Order](https://github.com/christian-wandling/demo-shop-react-ui/tree/main/libs/order/README.md) - Order processing, history, and management
- [Navigation](https://github.com/christian-wandling/demo-shop-react-ui/tree/main/libs/navigation/README.md) - Site navigation components and routing
- [Shared](https://github.com/christian-wandling/demo-shop-react-ui/tree/main/libs/shared/README.md) - Common utilities and shared components
- [OpenApiGenerator](https://github.com/christian-wandling/demo-shop-react-ui/tree/main/libs/api/README.md) - API client generation tools and configurations

### Tech stack

- **React** - Progressive web framework
- **TypeScript** - Type-safe JavaScript
- **Zustand** - State Management
- **HTML2Canvas/jsPDF** - Pdf generation
- **Tailwind CSS** - Styling
- **Keycloak** - Secure Authentication
- **Vitest** - Unit testing
- **Nx** - Mono-repo build system
- **Commitlint/Commitizen** - Standardize commit messages
- **Husky** - Pre-commit hooks
- **ESLint/Lint-staged** - Automated linting
- **Prettier** - Automatef code formating

## Setup

### Prerequisites

- <a href="https://nodejs.org/en" target="\_blank">Node.js 20</a> or later
- <a href="https://www.npmjs.com/" target="\_blank">npm</a> or <a href="https://yarnpkg.com/" target="\_blank">yarn</a>

### Installation

1. Clone the repository

```
git clone https://github.com/christian-wandling/demo-shop-react-ui.git
```

2. Install dependencies

```
npm install
```

3. Follow the setup guide of either the NestJS or ASP.NET Core Api

Full stack project using Angular and NestJS

> <a href="http://github.com/christian-wandling/demo-shop-public" target="_blank">http://github.com/christian-wandling/demo-shop-public</a>

Api using ASP.NET Core

> <a href="http://github.com/christian-wandling/demo-shop-dotnet-api" target="_blank">http://github.com/christian-wandling/demo-shop-dotnet-api</a>

### Usage

1. Open the web app

```
http://localhost:4200
```

## Testing

To run all tests in the project use

```
npm run test
```

To test an app or lib use

```
nx test <name>
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
