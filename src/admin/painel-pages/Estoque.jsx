// Imports Bibliotecas
import { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ProductModal from '../painel-componentes/ProductModal';

const Estoque = () => {
  const [productList, setProductList] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    price: '',
    status: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProductList(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        toast.error('Erro ao buscar produtos.');
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    setProductList(productList.filter(product => product.id !== id));
    toast.success('Produto deletado com sucesso.');
  };

  const handleEdit = (id) => {
    // Lógica para editar o produto
    console.log(`Editar produto com ID: ${id}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSaveProduct = async (formData) => {
    try {
      await axios.post('http://localhost:5000/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const response = await axios.get('http://localhost:5000/products');
      setProductList(response.data);
      toast.success('Produto adicionado com sucesso.');
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      toast.error('Erro ao adicionar produto.');
    }
  };

  const filteredProducts = productList.filter(product => {
    const categoryMatch = filters.category === '' || product.category === filters.category;
    const priceMatch = filters.price === '' || (
      (filters.price === '0-20' && product.price >= 0 && product.price <= 20) ||
      (filters.price === '20-50' && product.price > 20 && product.price <= 50) ||
      (filters.price === '50-100' && product.price > 50 && product.price <= 100)
    );
    const statusMatch = filters.status === '' || product.status === filters.status;

    return categoryMatch && priceMatch && statusMatch;
  });

return (
    <main className="p-4 bg-green-50 min-h-screen">
        <div className="Title">
            <h1>Lista de <span>Estoque</span></h1>
        </div>

        <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
                <select name="category" value={filters.category} onChange={handleFilterChange} className="p-2 border border-green-200 rounded">
                    <option value="">Categoria</option>
                    <option value="Suculentas">Suculentas</option>
                    <option value="Adubos">Adubos</option>
                    <option value="Cactos">Cactos</option>
                    <option value="Terras">Terras</option>
                </select>
                <select name="price" value={filters.price} onChange={handleFilterChange} className="p-2 border border-green-200 rounded">
                    <option value="">Preço</option>
                    <option value="0-20">R$ 0 - R$ 20</option>
                    <option value="20-50">R$ 20 - R$ 50</option>
                    <option value="50-100">R$ 50 - R$ 100</option>
                </select>
                <select name="status" value={filters.status} onChange={handleFilterChange} className="p-2 border border-green-200 rounded">
                    <option value="">Status</option>
                    <option value="Disponível">Disponível</option>
                    <option value="Indisponível">Indisponível</option>
                </select>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="p-2 px-8 bg-green-600 text-white rounded">Adicionar</button>
        </div>

        <section>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-green-100 text-sm">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Nome</th>
                            <th className="px-4 py-2">Descrição</th>
                            <th className="px-4 py-2">Preço</th>
                            <th className="px-4 py-2">Imagem</th>
                            <th className="px-4 py-2">Categoria</th>
                            <th className="px-4 py-2">Estoque</th>
                            <th className="px-4 py-2">Quantidade</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id} className="hover:bg-green-50 text-xs text-center">
                                <td className="px-4 py-1">{product.id}</td>
                                <td className="px-4 py-1">{product.name}</td>
                                <td className="px-4 py-1">{product.description}</td>
                                <td className="px-4 py-1">R$ {Number(product.price).toFixed(2)}</td>
                                <td className="px-4 py-1">
                                    {product.image ? (
                                        <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="w-8 h-8 object-cover rounded-lg mx-auto" />
                                    ) : (
                                        <FaTrash className="text-gray-400 mx-auto" />
                                    )}
                                </td>
                                <td className="px-4 py-1">{product.category}</td>
                                <td className="px-4 py-1">{product.stock}</td>
                                <td className="px-4 py-1">{product.quantidade}</td>
                                <td className="px-4 py-2">{product.status}</td>
                                <td className="px-4 py-1 flex justify-center space-x-2">
                                    <button onClick={() => handleEdit(product.id)} className="text-blue-600 hover:text-blue-800">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

        <ProductModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveProduct}
        />
    </main>
);
}

export default Estoque;
