import { useEffect, useState } from "react";
import { api } from "../services/axios";


export function User() {
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data, status } = await api.get('/profile');
                if (status === 200) {
                    setEmail(data.email);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <p className="text-xl md:text-3xl text-white">Carregando...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-lg md:text-xl">{error}</p>;
    }

    return <p className="mb-4 md:mb-0 text-xl md:text-3xl text-white">{email}</p>;
}
