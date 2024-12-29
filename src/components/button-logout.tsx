import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axios';

export function ButtonLogout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Previne o comportamento padrão do botão
        setLoading(true); // Inicia o indicador de carregamento

        try {
            const res = await api.get('/logout');
            console.log(res.status)
            if (res.status === 200) {
                localStorage.removeItem("token");
                console.log('Redirecting to home'); // Log antes do redirecionamento
                navigate('/'); // Redireciona para a página inicial
            }
        } catch (err) {
            console.error("Logout error:", err);
            // Aqui também você pode adicionar uma mensagem de erro para o usuário
        } finally {
            setLoading(false); // Finaliza o indicador de carregamento
        }
    };

    return (
        <button 
            onClick={handleLogout} 
            disabled={loading} 
            className="ml-3 p-2.5 text-white text-xl bg-none outline-none rounded-lg border border-white border-solid cursor-pointer"
        >
            {loading ? 'Logging out...' : 'LOGOUT'}
        </button>
    );
}
