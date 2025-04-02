import { formatCurrency } from '@demo-shop-react-ui/shared';
import { useShoppingCartStore } from '@demo-shop-react-ui/shopping';
import { useProductStore } from '../../+state/useProductStore';
import { useEffect } from 'react';
import { useParams } from 'react-router';

export const ProductDetail = () => {
  const { id } = useParams();
  const getProductById = useProductStore(state => state.getProductById);
  const fetchProductById = useProductStore(state => state.fetchProductById);
  const hasActiveSession = useShoppingCartStore(state => state.hasActiveSession);
  const add = useShoppingCartStore(state => state.add);

  useEffect(() => {
    if (id) {
      fetchProductById(+id);
    }
  }, [id, fetchProductById]);

  if (!id) {
    return <div>Product ID is missing</div>;
  }

  const product = getProductById(+id);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail pt-6">
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-h-1 aspect-w-1 overflow-hidden sm:rounded-lg lg:block">
          <img
            src={product.thumbnail.uri ?? ''}
            alt={product.name}
            onError={e => {
              e.currentTarget.src = 'images/placeholder-image.jpg';
            }}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
        </div>

        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl tracking-tight text-gray-900">{formatCurrency(product.price)}</p>

          <button
            onClick={_ => add({ productId: product.id })}
            disabled={!hasActiveSession()}
            className={`btn-add mt-10 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium
  ${
    hasActiveSession()
      ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      : 'bg-gray-100 text-gray-800 pointer-events-none'
  }`}>
            Add to cart
          </button>
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          <div className="product-description text-sm text-gray-600">{product.description}</div>
        </div>
      </div>
    </div>
  );
};
