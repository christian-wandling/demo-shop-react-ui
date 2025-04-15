# DemoShop React UI

This repository contains a React frontend for the Demo Shop platform, a full-stack e-commerce application built for educational purposes using modern web technologies.

## Overview

The Demo Shop platform is maintained over multiple separate repositories supporting interchangeable implementations.

1. [demo-shop-public](http://github.com/christian-wandling/demo-shop-react-ui): Angular frontend, NestJS API and Terraform setup for AWS
2. [demo-shop-dotnet-api](http://github.com/christian-wandling/demo-shop-dotnet-api): ASP.NET Core implementation of the API
3. [demo-shop-e2e](http://github.com/christian-wandling/demo-shop-e2e): E2E Testing with playwright

This application requires either the api from **demo-shop-public** or **demo-shop-dotnet-api** to work.

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
- **Zustand** - State management
- **React Router** - Navigation and routing
- **React Hook Form** - Performant form management
- **Zod** - Schema validation
- **Framer Motion** - Animation library
- **HTML2Canvas/jsPDF** - PDF generation
- **Tailwind CSS** - Styling

#### Auth

- **Keycloak** - Secure Authentication

### Testing and Documentation

- **Vitest** - Unit testing
- **Playwright** - E2E testing

### DevOps & Infrastructure

- **Nx** - Mono-repo build system
- **Docker** - Containerization
- - **Github CI/CD** - Continuous Integration/Continuous Deployment

### Dev workflow

- **Commitlint/Commitizen** - Standardize commit messages
- **Husky** - Pre-commit hooks
- **ESLint/Lint-staged** - Automated linting
- **Prettier** - Automated code formating

## Setup

### Prerequisites

- <a href="https://nodejs.org/en" target="\_blank">Node.js 20</a> or later
- <a href="https://www.npmjs.com/" target="\_blank">npm</a> or <a href="https://yarnpkg.com/" target="\_blank">yarn</a>
- <a href="https://www.docker.com/" target="\_blank">Docker</a>

### Installation

1. Clone the repository

```
git clone https://github.com/christian-wandling/demo-shop-react-ui.git
```

2. Install dependencies

```
npm install
```

3. Create shared docker network

```
docker network create shared
```

4. Build & Run the docker containers

```
npm start
```

5. Follow the setup guide of either the NestJS or ASP.NET Core Api

Full stack project using Angular and NestJS

> <a href="http://github.com/christian-wandling/demo-shop-public" target="_blank">http://github.com/christian-wandling/demo-shop-public</a>

Api using ASP.NET Core

> <a href="http://github.com/christian-wandling/demo-shop-dotnet-api" target="_blank">http://github.com/christian-wandling/demo-shop-dotnet-api</a>

6. Access the application

```
Frontend: http://localhost:4200
API: http://localhost:3000
Swagger Documentation: http://localhost:4200/api/docs
Keycloak: http://localhost:8080
PgAdmin: http://localhost:80
```

### Usage

1. Open the web app

```
http://localhost:4200
```

## User management

### User registration via web app

1. Open the web app

```
http://localhost:4200
```

2. Click `Register` and create the user

### User creation via Keycloak admin console

1. Access the Keycloak server to add a user

```
http://localhost:8080/admin/master/console/#/demo_shop/users/add-user
```

2. To login use `KEYCLOAK_ADMIN` and `KEYCLOAK_ADMIN_PASSWORD` defined in your [.env](.env) file.

3. Fill `Email`, `First Name` and `Last name`

4. Navigate to the `Credentials` tab and use `Set Password` to create as password

5. Fill `Password` and `Password Confirmation` and deselect `Temporary`

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
