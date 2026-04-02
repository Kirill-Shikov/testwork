import React from 'react';
import { useProductsStore } from '../store/use-products-store';

export default function FilterBar() {

  // текущее значение фильтра
  const filter = useProductsStore(state => state.filter);
  // установка  значения фильтра
  const setFilter = useProductsStore(state => state.setFilter);
  // количество в избранном
  const likedCount = useProductsStore(state => state.products.filter(p => p.isLiked).length);

  return (
  <div className="filter-bar">
    <button
      onClick={() => setFilter('all')}
      className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
    >
      Все
    </button>
    <button
      onClick={() => setFilter('liked')}
      className={`filter-btn ${filter === 'liked' ? 'active' : ''}`}
    >
      Избранное ({likedCount})
    </button>
  </div>
  );
}