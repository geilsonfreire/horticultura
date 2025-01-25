// Import Bibliotecas
import { Outlet } from 'react-router-dom';

// Import css
import "../../style/painel-adm-home.css";
import "../../style/global.css";

// Import Components
import Menu from "../painel-componentes/painel-adm-menu";
import Header from "../painel-componentes/painel-adm-header";


const PainelAdmHome = () => {
    // Renderiza o componente jsx
    return (
        <div className="admin-layout">
            <div className="menu-lateral">
                <Menu />
            </div>
            <div className="admin-main">
                <Header />
                <main id='Fund'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default PainelAdmHome;
