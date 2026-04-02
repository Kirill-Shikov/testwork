import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import { useProductsStore } from '../store/use-products-store';

export default function ProductsPage() {
  const products = useProductsStore(state => state.products);
  const filter = useProductsStore(state => state.filter);
  const loading = useProductsStore(state => state.loading);
  const error = useProductsStore(state => state.error);
  const loadProducts = useProductsStore(state => state.loadProducts);

  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, [loadProducts, products.length]);

  const filteredProducts = filter === 'liked'
    ? products.filter(p => p.isLiked)
    : products;

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>Продукты</h1>
        <Link to="/create-product">
          <button className="btn btn-primary">Создать продукт</button>
        </Link>
      </div>
      <FilterBar />
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="loading">
          {filter === 'liked' ? 'Нет избранных продуктов' : 'Пока нет продуктов'}
        </div>
      )}
    </div>
  );
}