import { useState } from 'react';
import * as Form from "@radix-ui/react-form";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Button } from '../components/button';
import { PasswordCheckList } from '../components/password-check-list';
import { LockKeyhole } from 'lucide-react';
import { toast } from 'react-toastify';
import { Header } from '../components/header';
import { api } from '../services/axios';

const ResetPasswordSchema = z.object({
    password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(32, "Password must be at most 32 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"), 
});

type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export function ResetPassword() { 
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(ResetPasswordSchema)
    });
    const { token } = useParams<{ token: string }>();
    const onSubmit = async (data: ResetPasswordSchema) => {
        setLoading(true);
        setError(null);
        
        if(data.password !== confirmPassword){
           setError('Passwords do not match')
           setLoading(false);
           return
        }

        try {
            const res = await api.post(`/reset-password/${token}`, data);
            if (res.status === 200) {
                toast.success('Password reset!', {
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
                    navigate('/login');
                },4000)
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
            <Header/>
            <Form.Root 
                className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-xl border border-solid border-[#11181C] sm:max-w-sm md:max-w-md lg:max-w-lg"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className='text-xl sm:text-2xl md:text-3xl mb-3 border-[#11181C]'>Reset Password</h2>
                <p className='inline-block text-base mb-4 text-[#687076]'>Enter a new password for noreply@shopify.com</p>
                <Form.Field name='password' className='mb-3'>
                    <Form.Label className='text-[#11181C]'>Password</Form.Label>
                    <div className='relative'>
                        <LockKeyhole size={20} className={`absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 ${errors.password ? 'text-red-600' : ' text-gray-500'}`}/>
                        <input
                            {...register("password", { required: "Password is required" })}
                            className={`box-border text-[#687076] inline-flex h-[44px] w-full appearance-none items-center justify-center rounded px-10 outline-none border border-solid border-[#687076] caret-zinc-500 ${errors.password ? 'border-red-600' : ''}`}
                            type={"password"}
                            placeholder="Enter your new password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                </Form.Field>
                <Form.Field name='password' className='mb-3'>
                    <Form.Label className='text-[#11181C]'>Confirm Password</Form.Label>
                    <div className='relative'>
                        <LockKeyhole size={20} className={`absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 ${errors.password ? 'text-red-600' : ' text-gray-500'}`}/>
                        <input
                            className={`box-border text-[#687076] inline-flex h-[44px] w-full appearance-none items-center justify-center rounded px-10 outline-none border border-solid border-[#687076] caret-zinc-500 ${errors.password ? 'border-red-600' : ''}`}
                            type={"password"}
                            placeholder="Confirm your new password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </Form.Field>
                <div className='mb-2 px-2.5'>
                  <PasswordCheckList password={password}/>
                </div>
                
                <Form.Submit asChild className='mb-3'>
                    <Button  disabled={loading} text = {loading ? "Resetting..." : "Set New Password"} />
                </Form.Submit>
                {error && <div className="text-red-600 mt-4 text-center">{error}</div>} 
            </Form.Root>
        </>
    );
}


