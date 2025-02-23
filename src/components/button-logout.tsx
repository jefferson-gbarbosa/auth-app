import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/axios';
import React from 'react';

interface ButtonLogoutProps {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ButtonLogout({ setIsAuthenticated }: ButtonLogoutProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); 
        setLoading(true); 
        try {
            const res = await api.get('/logout');
            console.log(res.status)
            if (res.status === 200) {
                localStorage.removeItem("token");
                console.log('Redirecting to home');
                setIsAuthenticated(false);
                navigate('/home'); 
            }
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            setLoading(false);
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
