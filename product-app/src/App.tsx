import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route
          path="*"
          element={
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h2>Страница не найдена</h2>
              <Link to="/products">Вернуться к списку продуктов</Link>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;