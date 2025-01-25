import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filters, setFilters] = useState({
        priceRange: [0, 1000000],
        categories: []
    });
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setAllProducts(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = allProducts.filter(product => {
        const priceInRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
        return priceInRange && categoryMatch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Carousel />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
                <div className="flex md:hidden justify-end mb-4">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-gray-600 hover:text-gray-900"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex gap-8">
                    <Sidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                        onFilterChange={setFilters}
                        filters={filters}
                    />

                    <div className="flex-1">
                        <div className="subtitle w-full border-b-2 border-green-500 my-8">
                            <h1 className="text-3 font-bold text-green-500 tracking-wider uppercase" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Nossos Produtos</h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-600">Nenhum produto encontrado com os filtros selecionados.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}