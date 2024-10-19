import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Header } from './header';
import { Footer } from "./footer";
import { api } from "../api/axios";


interface ProfileData {
    name: string;
    // Add other profile fields as necessary
}

export function Profile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data, status } = await api.get('/profile', { withCredentials: true });
                
                if (status === 200) {
                    setProfile(data);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load profile. Redirecting to login...");
                localStorage.removeItem("refreshToken");
                navigate('/login'); // Redireciona para o login em caso de erro
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen text-white"><p className="text-3xl">Loading...</p></div>;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                <p className="text-xl">{error}</p>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="flex justify-center flex-col items-center max-w-screen-xl mx-auto min-h-screen">
                <h1 className="text-3xl pb-4 text-white">Seja bem-vindo, {profile?.name}!</h1>
                <p className="text-lg text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Dolores nisi consequatur culpa eos veritatis atque molestiae est at recusandae, 
                    praesentium non magnam eveniet sunt nobis reprehenderit soluta cum dignissimos impedit?
                    
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    A qui porro corporis laudantium sapiente amet. 
                    Architecto, quod error eveniet itaque repudiandae eius eligendi, magnam dolore sed impedit nobis adipisci aliquid!
                </p>
            </div>
            <Footer />
        </>
    );
}
