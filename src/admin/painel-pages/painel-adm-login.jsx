/* eslint-disable no-unused-vars */
// Import Bibliotecas
import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

// Import CSS
import "../../style/AdmLoginRegister.css";

// Import icons
import { BsFillPersonFill } from "react-icons/bs";

// Create a functional component called Login
const AdmLogin = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); 

        if (!emailOrUsername || !password) {
            toast.error('Por favor, preencha todos os campos.');
            return;
        }

        if (password.length < 6) {
            toast.error('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        try {
            // Faz requisição ao backend para login
            await axios.post('http://localhost:5000/login', { emailOrUsername, password });
            toast.success('Logado com sucesso!');
            navigate('/adm/home'); // Redireciona para a página de administrador
        } catch (error) {
            toast.error('Erro na autenticação. Verifique suas credenciais.');
        }
    };

    return (
        <main className="LoginContainer">
            {/* Left */}
            <section className="LoginContainerLeft">
                
            </section>

            {/* Right */}
            <section className="LoginContainerRight">
                <div className="EntradaLogin">
                    <div className="LoginHeader">
                        <span>Login</span>
                    </div>

                    <form className="FormLogin" onSubmit={handleLogin}>
                        <div className="InputWithIcon">
                            <BsFillPersonFill className="InputIcon" />
                            <input
                                type="text"
                                placeholder="Usuário ou E-mail"
                                value={emailOrUsername}
                                onChange={(e) => setEmailOrUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="InputWithIcon">
                            <input
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="esqueceuSenha">
                            <a className="EsqueseuSenha" href="#" onClick={(e) => {
                                e.preventDefault(); // Evita o comportamento padrão de seguir o link
                                toast('Funcionalidade de recuperação de senha não implementada.');
                            }}>
                                Esqueceu sua senha?
                            </a>
                        </div>

                        <button
                            className="BtnLogin"
                            type="submit"
                        >
                            Entrar
                        </button>

                        <div className="Divider">
                            <span className="DividerLine"></span>
                            <span className="DividerText">ou</span>
                            <span className="DividerLine"></span>
                        </div>
                    </form>

                    <div className="link">
                        <p>Não tem uma conta?
                            <Link
                                to="/adm/register">
                                Criar conta
                            </Link>
                        </p>

                    </div>
                </div>
            </section>
        </main>
    );
}

export default AdmLogin;