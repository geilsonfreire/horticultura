// Import Bibliotecas
import { useEffect } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Import icon, img assets
import logo from "../../assets/img/Logo/Logo.webp";

// Import CSS
import "../../style/painel-adm-menu.css";
import "../../style/global.css";


// Import icon
import { MdSpaceDashboard } from "react-icons/md";
import { BsBoxes } from "react-icons/bs";

const AdmMenu = () => {

    useEffect(() => {
        const mainMenuLi = document.getElementById("mainMenu").querySelectorAll("li");

        const changeActive = (event) => {
            mainMenuLi.forEach(n => n.classList.remove("active"));
            event.currentTarget.classList.add("active");
        };

        mainMenuLi.forEach(n => n.addEventListener("click", changeActive));

        return () => {
            mainMenuLi.forEach(n => n.removeEventListener("click", changeActive));
        };
    }, []);


    return (
        <nav className="Menu-lateral">
            <Link to="/adm/home">
                <img src={logo} alt="Logo da pagina" />
            </Link>

            <ul id="mainMenu">
                <Icon
                    to="/adm/home"
                    icon={<MdSpaceDashboard />}
                    title="DashBoard"
                />

                <Icon
                    to="/adm/home/estoque"
                    icon={<BsBoxes />}
                    title="Estoque"
                />
              
            </ul>
        </nav>
    )
}

const Icon = ({ to, icon, title, onClick }) => ( // Icon component
    <li>
        <Link to={to} title={title} onClick={onClick} >
            {icon}
            <span className="icon-text">{title}</span>
        </Link>
    </li>
);

Icon.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default AdmMenu
