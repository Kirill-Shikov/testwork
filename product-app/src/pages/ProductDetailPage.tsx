import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductsStore } from '../store/use-products-store';


export default function ProductDetailPage() {
  const { id } = useParams();
  const product = useProductsStore(state =>
    state.products.find(p => p.id === Number(id))
  );

  if (!product) {
    return (
      <div className="container">
        <div className="error" style={{ textAlign: 'center' }}>
          <h2>Продукт не найден</h2>
          <Link to="/products" className="btn btn-secondary">Вернуться к списку</Link>
        </div>
      </div>
    );
  }

  return (
  <div className="container">
    <div className="product-detail">
      <img src={product.image} alt={product.title} className="product-detail__image" />
      <div className="product-detail__info">
        <h1 className="product-detail__title">{product.title}</h1>
        <p className="product-detail__description">{product.description}</p>
        <div className="product-detail__price">${product.price}</div>
      </div>
    </div>
    <Link to="/products" className="btn btn-secondary back-link">
      Назад к списку
    </Link>
  </div>
);
}