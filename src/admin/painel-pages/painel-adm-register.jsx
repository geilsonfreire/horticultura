// Import Bibliotecas
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

// Import CSS
import "../../style/AdmLoginRegister.css";

// Import icons
import { BsFillPersonFill } from "react-icons/bs";

// Create a functional component called Register
const AdmRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault(); 

        if (!username || !email || !password || !confirmPassword) {
            toast.error('Por favor, preencha todos os campos.');
            return;
        }

        if (password.length < 6) {
            toast.error('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('As senhas não coincidem.');
            return;
        }

        try {
            // Faz requisição ao backend para registrar usuário
            await axios.post('http://localhost:5000/register', { username, email, password, role });
            toast.success('Registrado com sucesso!');
            navigate('/adm/login'); // Redireciona para a página de login
        } catch (error) {
            toast.error('Erro no registro. Verifique suas credenciais.');
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
                        <span>Registrar</span>
                    </div>

                    <form className="FormLogin" onSubmit={handleRegister}>
                        <div className="InputWithIcon">
                            <BsFillPersonFill className="InputIcon" />
                            <input
                                type="text"
                                placeholder="Nome de Usuário"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="InputWithIcon">
                            <BsFillPersonFill className="InputIcon" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        <div className="InputWithIcon">
                            <input
                                type="password"
                                placeholder="Confirme a Senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="rules">
                            <div className="rule">
                                <input
                                    type="radio"
                                    name="role"
                                    value="user"
                                    checked={role === 'user'}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <label>Usuário</label>
                            </div>

                            <div className="rule">
                                <input
                                    type="radio"
                                    name="role"
                                    value="adm"
                                    checked={role === 'adm'}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <label>Administrador</label>
                            </div>
                        </div>
                        <div className="esqueceuSenha">
                            <a className="EsqueseuSenha" href="#" onClick={(e) => {
                                e.preventDefault();
                                toast('Funcionalidade de recuperação de senha não implementada.');
                            }}>
                                Esqueceu sua senha?
                            </a>
                        </div>

                        <button
                            className="BtnLogin"
                            type="submit"
                        >
                            Registrar
                        </button>

                        <div className="Divider">
                            <span className="DividerLine"></span>
                            <span className="DividerText">ou</span>
                            <span className="DividerLine"></span>
                        </div>
                    </form>
                    <div className="link">
                        <p>Já tem conta?
                            <Link to="/adm/login">
                                Login aqui!
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AdmRegister;