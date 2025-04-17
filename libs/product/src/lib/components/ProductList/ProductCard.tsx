import { formatCurrency } from '@demo-shop-react-ui/shared';
import { Link } from 'react-router';

export const ProductCard = ({ product }: { product: any }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="product-item group"
      key={product.id}
      data-testid={`product-list-item-link${product.id}`}>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={product.thumbnail.uri || 'images/placeholder-image.jpg'}
          alt={product.name}
          onError={e => {
            e.currentTarget.src = 'images/placeholder-image.jpg';
          }}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
          data-testid={`product-list-item-image${product.id}`}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700" data-testid={`product-list-item-name${product.id}`}>
        {product.name}
      </h3>
      <p className="mt-1 text-lg font-medium text-gray-900" data-testid={`product-list-item-price${product.id}`}>
        {formatCurrency(product.price)}
      </p>
    </Link>
  );
};
