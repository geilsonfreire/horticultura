// Imports Bibiotecas
import { useNavigate } from 'react-router-dom'
import PropTypes from "prop-types";

//Import icon, image
import { MdSettings, MdLogout, MdPersonAddAlt1 } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

// Import de Componentes



const MenuDropDownPerfil = ({ isDropdownOpen, setIsDropdownOpen }) => {
    const navigate = useNavigate();

    const handleNavigate = (path) => { 
        setIsDropdownOpen(false);
        navigate(path);
    };

    const handleLogout = () => {
        navigate('/'); // Redireciona para a página inicial após logout
    };

    return (
        <div className={`absolute w-52 top-20 right-1 bg-gray-800 p-2 rounded-lg transition-opacity duration-300 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="absolute top-[-10px] right-5 border-x-transparent border-t-transparent border-b-gray-800 border-8"></div>
            <nav className='menu-dropdown-nav'>
                <ul className="list-none p-0 m-0">
                    <li onClick={() => handleNavigate('/admin/perfil')} className="flex items-center p-2 text-white cursor-pointer transition-colors duration-300 hover:bg-gray-700 hover:text-blue-600 rounded-lg">
                        <FaUserEdit className="mr-2 text-lg" />
                        <span className="text-base">Perfil</span>
                    </li>
                    <li onClick={() => handleNavigate('/admin/adminCadastroUsuarios')} className="flex items-center p-2 text-white cursor-pointer transition-colors duration-300 hover:bg-gray-700 hover:text-blue-600 rounded-lg">
                        <MdPersonAddAlt1 className="mr-2 text-lg" />
                        <span className="text-base">Adicionar usuario</span>
                    </li>
                    <li onClick={() => handleNavigate('/admin/adminConfig')} className="flex items-center p-2 text-white cursor-pointer transition-colors duration-300 hover:bg-gray-700 hover:text-blue-600 rounded-lg">
                        <MdSettings className="mr-2 text-lg" />
                        <span className="text-base">Configurações</span>
                    </li>
                    <hr className="border-none border-t border-gray-600 my-2" />
                    <li onClick={handleLogout} className="flex items-center p-2 text-white cursor-pointer transition-colors duration-300 hover:bg-gray-700 hover:text-blue-600 rounded-lg">
                        <MdLogout className="mr-2 text-lg" />
                        <span className="text-base">Sair</span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

MenuDropDownPerfil.propTypes = {
    isDropdownOpen: PropTypes.bool.isRequired,
    setIsDropdownOpen: PropTypes.func.isRequired,
};

export default MenuDropDownPerfil;
