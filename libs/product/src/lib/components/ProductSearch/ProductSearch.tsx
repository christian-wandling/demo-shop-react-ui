import { useNavigate } from 'react-router';
import { useProductStore } from '../../+state/useProductStore';

export const ProductSearch = () => {
  const navigate = useNavigate();
  const filter = useProductStore(state => state.filter);
  const { setFilter } = useProductStore();

  /**
   * Updates the product name filter in the application state
   *
   * @param name - The product name to filter by, or undefined to clear the filter
   */
  const setProductNameFilter = (name: string) => {
    setFilter({ name });
  };

  /**
   * Navigates the user to the products page
   *
   * This method is typically triggered when a user submits a search or clicks
   * on the search component.
   */
  const goToProductPage = () => {
    navigate('/products');
  };

  const handleKeyDown = (key: string) => {
    if (key === 'Enter') {
      goToProductPage();
    }
  };

  return (
    <div className="flex align-middle lg:ml-6 cursor-pointer relative">
      <a className="p-2.5 text-gray-400 hover:text-gray-500">
        <span className="sr-only">Search</span>
        <img src="/icons/search.svg" alt="search" height="20" width="20" />
      </a>
      <div className={`search-input relative ${filter.name ? 'extended' : ''}`}>
        <input
          type="text"
          name="price"
          className="block w-full my-0.5 rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          placeholder="Search products"
          value={filter.name}
          onChange={e => setProductNameFilter(e.target.value)}
          onKeyDown={e => handleKeyDown(e.key)}
        />
        {filter.name && (
          <div className="enter-icon absolute right-2 inset-y-0 flex items-center" onClick={goToProductPage}>
            <img src="/icons/enter.svg" alt="enter" height="16" width="16" />
          </div>
        )}
      </div>
    </div>
  );
};
