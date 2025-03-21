import { ProductDetail, ProductList } from '@demo-shop-react-ui/product';
import { Navigate, Route, Routes } from 'react-router';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
