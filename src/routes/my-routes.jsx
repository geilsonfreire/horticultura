// Import Bibliotecas
import { Route, Routes, Navigate } from "react-router-dom";
import { StrictMode } from "react";

// Import Componentes
import Home from '../pages/home.jsx';
import Cart from '../pages/Cart';
import Navbar from "../components/Navbar.jsx";

// Import Componentes do Painel Administrativo
import PainelAdmHome from '../admin/painel-pages/painel-adm-home.jsx';
import AdmLogin from '../admin/painel-pages/painel-adm-login.jsx';
import AdmRegister from '../admin/painel-pages/painel-adm-register.jsx';
import DashBoard from "../admin/painel-pages/Dashborder.jsx";
import Estoque from "../admin/painel-pages/Estoque.jsx";

const MyRoutes = () => {
    return (
        <StrictMode>
            <Routes>
                <Route path="/" element={<><Navbar /><Home /></>} />
                <Route path="/cart" element={<><Navbar /><Cart /></>} />

                {/* Rotas do Painel Administrativo */}
                <Route path="/adm" element={<Navigate to="/adm/login" />} />
                <Route path="/adm/login" element={<AdmLogin />} />
                <Route path="/adm/register" element={<AdmRegister />} />
                <Route path="/adm/home" element={<PainelAdmHome />}>
                    <Route index element={<DashBoard />} />
                    <Route path="estoque" element={<Estoque />} />
                </Route>
            </Routes>
        </StrictMode>
    );
}

export default MyRoutes;