import React from 'react';
import { Link } from 'react-router-dom';
import { useProductsStore } from '../store/use-products-store';

// Просто объявите тип прямо в файле
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  isLiked: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const toggleLike = useProductsStore(state => state.toggleLike);
  const removeProduct = useProductsStore(state => state.removeProduct);

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__link">
        <img
          src={product.image}
          alt={product.title}
          className="product-card__image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://picsum.photos/id/100/300/200';
          }}
        />
        <div className="product-card__content">
          <h3 className="product-card__title">{product.title}</h3>
          <p className="product-card__description">{product.description?.substring(0, 100)}...</p>
          <div className="product-card__price">${product.price}</div>
        </div>
      </Link>
      <div className="product-card__actions">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleLike(product.id);
          }}
          className={`like-btn ${product.isLiked ? 'like-btn--liked' : ''}`}
        >
          {product.isLiked ? '❤️' : '🤍'}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            removeProduct(product.id);
          }}
          className="delete-btn"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}