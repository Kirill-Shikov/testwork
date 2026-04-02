import { create } from 'zustand';
import { fetchProducts } from '../api/productsApi';

// 👇 ДОБАВЬТЕ ЭТОТ ИНТЕРФЕЙС
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  isLiked: boolean;
}
// 👆 ДОБАВЬТЕ ЭТОТ ИНТЕРФЕЙС

interface ProductsStore {
  products: Product[];
  filter: 'all' | 'liked';
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id' | 'isLiked'>) => void;
  toggleLike: (id: number) => void;
  removeProduct: (id: number) => void;
  setFilter: (filter: 'all' | 'liked') => void;
  loadProducts: () => Promise<void>;
}

export const useProductsStore = create<ProductsStore>()((set) => ({
  products: [],
  filter: 'all',
  loading: false,
  error: null,

  loadProducts: async () => {
    set({ loading: true, error: null });
    try {
      const apiProducts = await fetchProducts();
      const products: Product[] = apiProducts.map(p => ({
        ...p,
        isLiked: false,
      }));
      set({ products, loading: false });
    } catch {
      set({ error: 'Ошибка загрузки продуктов', loading: false });
    }
  },

  addProduct: (newProduct) =>
    set(state => ({
      products: [
        ...state.products,
        {
          ...newProduct,
          id: Date.now(),
          isLiked: false,
        },
      ],
    })),

  toggleLike: (id) =>
    set(state => ({
      products: state.products.map(p =>
        p.id === id ? { ...p, isLiked: !p.isLiked } : p
      ),
    })),

  removeProduct: (id) =>
    set(state => ({
      products: state.products.filter(p => p.id !== id),
    })),

  setFilter: (filter) => set({ filter }),
}));