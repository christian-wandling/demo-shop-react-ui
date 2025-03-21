import { formatCurrency } from '@demo-shop-react-ui/shared';
import { Link } from 'react-router';

export function ProductCard({ product }: { product: any }) {
  return (
    <Link to={`/products/${product.id}`} className="product-item group" key={product.id}>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={product.thumbnail.uri || 'images/placeholder-image.jpg'}
          alt={product.name}
          onError={e => {
            e.currentTarget.src = 'images/placeholder-image.jpg';
          }}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{formatCurrency(product.price)}</p>
    </Link>
  );
}

export default ProductCard;
