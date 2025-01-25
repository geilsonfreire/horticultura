import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Home } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useState } from 'react';
import Logo from '../assets/img/Logo/Logo.webp';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const items = useCartStore((state) => state.items);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-black-600 flex items-center">
                            <img
                                src={Logo}
                                alt="Jv Cactos e Suculentos"
                                className="h-12 w-12 mr-10 cursor-pointer rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                            />
                            Jv Cactos e Suculentos
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-green-600">
                            <Home className="w-6 h-6" />
                        </Link>
                       
                        <Link to="/cart" className="relative text-gray-700 hover:text-green-600">
                            <ShoppingCart className="w-6 h-6" />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-green-600"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-4">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-green-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Home className="w-6 h-6" />
                            </Link>
                            
                            <Link
                                to="/cart"
                                className="text-gray-700 hover:text-green-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Carrinho ({itemCount})
                            </Link>
                           
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;