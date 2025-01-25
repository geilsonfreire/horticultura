import { useEffect } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const { items, fetchCartItems, removeItem, updateQuantity } = useCartStore();

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-8">Adicione alguns produtos para começar suas compras!</p>
          <Link
            to="/products"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Ver Produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Seu Carrinho</h1>
        <a
          href="https://wa.me/SEU_NUMERO_DE_TELEFONE"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        >
          <FaWhatsapp className="w-6 h-6" />
        </a>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center py-6 border-b border-gray-200 last:border-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            
            <div className="flex-1 ml-6">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600 mt-1">{item.description}</p>
              <div className="flex items-center mt-4">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus className="w-5 h-5 text-gray-600" />
                </button>
                <span className="mx-4 font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="text-right ml-6">
              <p className="text-lg font-bold text-green-600">
                R$ {(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="mt-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-green-600">
              R$ {total.toFixed(2)}
            </span>
          </div>
          
          <button className="w-full mt-8 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
