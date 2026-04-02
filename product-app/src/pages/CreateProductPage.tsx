import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormField from '../components/FormField';
import { useProductsStore } from '../store/use-products-store';

export default function CreateProductPage() {
  const navigate = useNavigate();
  const addProduct = useProductsStore(state => state.addProduct);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
// проверки полей
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title) newErrors.title = 'Название обязательно';
    if (!formData.description) newErrors.description = 'Описание обязательно';
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = 'Цена должна быть положительным числом';
    }
    if (!formData.image) newErrors.image = 'URL изображения обязателен';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      addProduct({
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        image: formData.image
      });
      navigate('/products');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Создать продукт</h1>
        <form onSubmit={handleSubmit}>
          <FormField
            label="Название"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
          />
          <FormField
            label="Описание"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
          />
          <FormField
            label="Цена"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            error={errors.price}
          />
          <FormField
            label="URL изображения"
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            error={errors.image}
          />
          <div className="form-buttons">
            <button type="submit" className="btn btn-success">
              Создать продукт
            </button>
            <Link to="/products" className="btn btn-secondary">
              Отмена
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}