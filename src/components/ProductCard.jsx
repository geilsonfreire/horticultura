import { useState } from 'react';
import { ShoppingCart, Heart, Info } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';
import ProductModal from './ProductModal';

export default function ProductCard({ product }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        addItem(product);
        toast.success('Produto adicionado ao carrinho!');
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                    />
                    <button
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                        onClick={() => toast.success('Adicionado aos favoritos!')}
                    >
                        <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <div className=" border-green-500 bg-green-100 p-2 rounded-md">
                        <p className="text-xs text-gray-600 text-[10px]">{product.description}</p>
                        <p className="text-xs text-gray-600 text-[10px]">{product.category}</p>
                        <p className="text-xs text-gray-600 text-[10px]">Estoque: {product.stock}</p>
                        <p className="text-xs text-gray-600 text-[10px]">{product.quantidade}</p>
                        <p className="text-xs text-green-600 text-[10px] text-right">{product.status}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-xl font-bold text-green-600">
                            R$ {Number(product.price).toFixed(2)}
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Ver detalhes"
                            >
                                <Info className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Comprar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={product}
            />
        </>
    );
}