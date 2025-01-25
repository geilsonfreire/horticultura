import { Filter, X } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar({ isOpen, onClose, onFilterChange, filters }) {
  const [isTerrasOpen, setIsTerrasOpen] = useState(false);

  const handlePriceChange = (min, max) => {
    const newPriceRange = filters.priceRange[0] === min && filters.priceRange[1] === max ? [0, 1000000] : [min, max];
    onFilterChange({
      ...filters,
      priceRange: newPriceRange
    });
  };

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFilterChange({
      ...filters,
      categories: newCategories
    });
  };

  const categories = [
    'Suculentas',
    'Cactos',
    'Adubos',
    'Terras'
  ];

return (
    <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-green-100 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 rounded-lg`}>
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-green-800 font-semibold flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filtros
                </h2>
                <button onClick={onClose} className="md:hidden">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-xs font-medium mb-3 w-full border-b-2 border-green-500">Preço</h3>
                    <div className="space-y-2">
                        <label className="flex items-center text-xs">
                            <input
                                type="checkbox"
                                name="price"
                                className="form-checkbox text-green-600"
                                onChange={() => handlePriceChange(0, 50)}
                                checked={filters.priceRange[0] === 0 && filters.priceRange[1] === 50}
                            />
                            <span className="ml-2">Até R$ 50</span>
                        </label>
                        <label className="flex items-center text-xs">
                            <input
                                type="checkbox"
                                name="price"
                                className="form-checkbox text-green-600"
                                onChange={() => handlePriceChange(50, 100)}
                                checked={filters.priceRange[0] === 50 && filters.priceRange[1] === 100}
                            />
                            <span className="ml-2">R$ 50 - R$ 100</span>
                        </label>
                        <label className="flex items-center text-xs">
                            <input
                                type="checkbox"
                                name="price"
                                className="form-checkbox text-green-600"
                                onChange={() => handlePriceChange(100, 200)}
                                checked={filters.priceRange[0] === 100 && filters.priceRange[1] === 200}
                            />
                            <span className="ml-2">R$ 100 - R$ 200</span>
                        </label>
                        <label className="flex items-center text-xs">
                            <input
                                type="checkbox"
                                name="price"
                                className="form-checkbox text-green-600"
                                onChange={() => handlePriceChange(200, 1000000)}
                                checked={filters.priceRange[0] === 200 && filters.priceRange[1] === 1000000}
                            />
                            <span className="ml-2">Acima de R$ 200</span>
                        </label>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-medium mb-3 w-full border-b-2 border-green-500">Categorias</h3>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <label key={category} className="flex items-center text-xs">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-green-600"
                                    checked={filters.categories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                />
                                <span className="ml-2">{category}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}