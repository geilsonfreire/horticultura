import { useState } from 'react';
import PropTypes from 'prop-types';

import "../../style/global.css";

const ProductModal = ({ isOpen, onClose, onSave }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
    status: 'Disponível',
    quantidade: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const filePath = `src/assets/img/Products/${file.name}`;
    setProduct({
      ...product,
      image: filePath
    });
    setImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'show' : ''}`}>
      <div className={`modal-content ${isOpen ? 'show' : ''}`}>
        <h2 className="text-2xl mb-4">Adicionar Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Preço</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Imagem</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
            {imageFile && (
              <img src={URL.createObjectURL(imageFile)} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Categoria</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="Suculentas">Suculentas</option>
              <option value="Adubos">Adubos</option>
              <option value="Cactos">Cactos</option>
              <option value="Terras">Terras</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Estoque</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantidade</label>
            <input
              type="text"
              name="quantidade"
              value={product.quantidade}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={product.status}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            >
              <option value="Disponível">Disponível</option>
              <option value="Indisponível">Indisponível</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProductModal;
