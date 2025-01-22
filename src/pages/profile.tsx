import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/header';
import { Footer } from "../components/footer";
import { ScaleLoader } from "react-spinners";
import { api } from "../services/axios";


interface ProfileData {
    name: string;
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
                localStorage.removeItem("token");
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) {
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#070707b6] flex justify-center items-center">
                <div className="flex justify-center items-center min-h-screen">
                    <ScaleLoader color="#2B805A" width={20}/>
                </div>
            </div>
        )
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
            <section className="flex justify-center flex-col items-center max-w-screen-xl mx-auto min-h-screen">
                <h1 className="text-3xl pb-4 text-white">Seja bem-vindo, {profile?.name}!</h1>
                <p className="text-lg text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Dolores nisi consequatur culpa eos veritatis atque molestiae est at recusandae, 
                    praesentium non magnam eveniet sunt nobis reprehenderit soluta cum dignissimos impedit?
                    
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    A qui porro corporis laudantium sapiente amet. 
                    Architecto, quod error eveniet itaque repudiandae eius eligendi, magnam dolore sed impedit nobis adipisci aliquid!
                </p>
            </section>
            <Footer />
        </>
    );
}
