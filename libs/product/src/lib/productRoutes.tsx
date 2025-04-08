import { lazy } from 'react';

const ProductList = lazy(() => import('./components/ProductList/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail/ProductDetail'));

export const productRoutes = [
  {
    path: '/products',
    children: [
      { index: true, element: <ProductList /> },
      { path: ':id', element: <ProductDetail /> },
    ],
  },
];
