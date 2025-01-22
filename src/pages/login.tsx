import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Form from "@radix-ui/react-form";
import { AxiosError } from 'axios';
import { api } from '../services/axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { Button } from '../components/button';

const LoginValues = z.object({
    email: z.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
    password: z.string().min(1, { message: 'This is required' }).min(6, { message: 'Too short' }),
})

type LoginValues = z.infer<typeof LoginValues>

export function Login() { 
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
        resolver:zodResolver(LoginValues)
    });

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const onSubmit = async (data: LoginValues) => { 
        setLoading(true);
        setError(null);
    
        try {
            const res = await api.post('/login', data);
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                navigate('/profile');   
            }
           
        } catch (err) {
            if (err instanceof AxiosError) {
                const message = err.response?.data?.message || 'An error occurred';
                setError(message);

            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>  
            <section  className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <Form.Root 
                    className="bg-white rounded-xl border border-solid border-[#11181C] p-6 sm:p-8 md:p-10 w-full max-w-md"
                    onSubmit={handleSubmit(onSubmit)}
                >   
                    <div className="text-center mb-6"> 
                        <h2 className='text-xl sm:text-2xl md:text-3xl mb-1 text-[#11181C]'>Welcome back! &#128079;</h2>
                        <p className='text-sm sm:text-base text-[#687076]'>Login with your account!</p>
                    </div>
                    <Form.Field name='email' className='mb-4'>
                        <Form.Label className='text-[#11181C]'>Email</Form.Label>
                        <div className='relative'>
                        <Mail size={20}  className={`w-4 h-4 sm:w-5 sm:h-5 absolute left-2 top-1/2 transform -translate-y-1/2 ${errors.email ? 'text-red-600' : ' text-gray-500'}`}/>
                        <input
                            {...register("email", { required: "Email is required" })}
                            className={`box-border text-[#687076] inline-flex h-[44px] w-full appearance-none items-center justify-center rounded px-10 outline-none border border-solid border-[#687076] caret-zinc-500 ${errors.email ? 'border-red-600' : ''}`}
                            type="email"
                            />
                        </div>
                        {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                    </Form.Field>

                    <Form.Field name='password' className='mb-6'>
                        <Form.Label className='text-[#11181C]'>Password</Form.Label>
                        <div className='relative'>
                        <LockKeyhole size={20}  className={`w-4 h-4 sm:w-5 sm:h-5 absolute left-2 top-1/2 transform -translate-y-1/2 ${errors.email ? 'text-red-600' : ' text-gray-500'}` }/>
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
                                {showPassword ? <Eye size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" /> : <EyeOff size={20} className="text-gray-500" />}
                            </div>
                            <input
                                {...register("password", { required: "Password is required" })}
                                className={`box-border text-[#687076] inline-flex h-[44px] w-full appearance-none items-center justify-center rounded px-10 outline-none border border-solid border-[#687076] caret-zinc-500 ${errors.password ? 'border-red-600' : ''}`}
                                type={showPassword ? "text" : "password"}
                            />
                        </div>
                        
                        {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                    </Form.Field>

                    <div className="flex justify-end mb-3">
                        <Link to="/forgot-password" className="text-sm text-[#1D1D1D] cursor-pointer hover:underline hover:text-[#687076]">Forgot your password?</Link>
                    </div>
                    <Form.Submit asChild className='mb-6'>
                    <Button disabled={loading} text={loading ? 'Logging in...' : 'Login Now'} />
                    </Form.Submit>
                    <div className='text-center text-sm'>
                        Don’t have an account? <Link to="/register" className='text-[#11181C] cursor-pointer hover:underline hover:text-[#687076]'>Signup</Link>
                    </div>
                    {error && <div className="text-red-600 mt-4 text-center">{error}</div>} 
                </Form.Root>
            </section>
        </>
    );
}
