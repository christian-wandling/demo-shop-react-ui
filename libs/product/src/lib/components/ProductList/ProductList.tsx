import { useEffect } from 'react';
import { useProductStore } from '../../+state/useProductStore';
import { ProductCard } from './ProductCard';

export default function ProductList() {
  useProductStore(state => state.products);
  useProductStore(state => state.filter);
  const fetchProducts = useProductStore(state => state.fetchProducts);
  const getFilteredProducts = useProductStore(state => state.getFilteredProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-white" data-testid="product-list">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {getFilteredProducts().map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
