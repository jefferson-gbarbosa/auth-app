import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Form from "@radix-ui/react-form";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Button } from '../components/button';
import { toast } from 'react-toastify';
import { Mail } from 'lucide-react';
import { Header } from '../components/header';
import { api } from '../services/axios';

const PasswordSchema = z.object({
    email: z.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
});

type PasswordValue = z.infer<typeof PasswordSchema>;

export function ForgotPassword() { 
    const navigate = useNavigate(); 
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null); 
    const { register, handleSubmit, formState: { errors } } = useForm<PasswordValue>({
        resolver: zodResolver(PasswordSchema),
    });

    const onSubmit = async (data: PasswordValue) => {
        setError(null);
        setEmail(data.email);
        try {
            const res = await api.post('/forgot-password', data);
            if (res.status === 200) {
                setLoading(true)
                toast.success('Check your email inbox!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(()=> {
                    setIsSubmitted(true);
                    navigate('/login');
                },4000)
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                const message = err.response?.data.message || 'An error occurred';
                setError(message);
                console.error(err);
            } else {
                setError('Password recovery failed. Please try again later.');
            }
        }
    };

    return (
        <>  
           <Header />
           <section className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl border border-solid border-[#11181C] p-6 sm:p-8 md:p-10 w-full max-w-md">
                <h2 className='text-3xl mb-2 border-[#11181C] text-center'>Forgot Password</h2>
                {!isSubmitted ? (
                        <Form.Root 
                            onSubmit={handleSubmit(onSubmit)}
                            >  
                            <Form.Field name='email' className='mb-4'>
                                <p className='text-base mb-4 text-[#687076] text-center'>
                                    Enter your email address and we'll send you a link to reset your password.
                                </p>
                                <Form.Label className='text-[#11181C]'>Email</Form.Label>
                                <input
                                    {...register("email")}
                                    className={`box-border text-[#687076] inline-flex h-[44px] w-full appearance-none items-center justify-center rounded px-2.5 outline-none border border-solid border-[#687076] caret-zinc-500 ${errors.email ? 'border-red-600' : ''}`}
                                    type="email"
                                />
                                {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                            </Form.Field>

                            <Form.Submit asChild className='mb-6'>
                                <Button disabled={loading} text={loading ? 'Sending...' : 'Send Reset Link'}/>
                            </Form.Submit>  
                        </Form.Root> 
                ) : (
                    <div className='text-center'>
                        <Mail className='h-12 w-12 text-[#2B805A] inline-block mb-6'/>
                        <p className='text-[#11181C] mb-6'>
                            If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
                        </p>
                    </div>   
                )}   
            </div> 
            {error && <div className="text-red-600 mt-4 text-center">{error}</div>} 
           </section>
        </>
    );
}
