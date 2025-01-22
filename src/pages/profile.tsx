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
            <section className="w-full py-6 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center  h-[calc(100vh-128px)]"> 
                    <div className="text-center w-full md:w-3/4 lg:w-2/3"> 
                        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                            Seja bem-vindo, {profile?.name}!
                        </h1>
                        <p className="text-white text-lg md:text-xl lg:text-lg leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Dolores nisi consequatur culpa eos veritatis atque molestiae est at recusandae,
                            praesentium non magnam eveniet sunt nobis reprehenderit soluta cum dignissimos impedit?

                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            A qui porro corporis laudantium sapiente amet.
                            Architecto, quod error eveniet itaque repudiandae eius eligendi, magnam dolore sed impedit nobis adipisci aliquid!
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
