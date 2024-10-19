import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Form from "@radix-ui/react-form";
import { api } from '../api/axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Button } from '../components/button';

const PasswordSchema = z.object({
    email: z.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
});

type PasswordValue = z.infer<typeof PasswordSchema>;

export function ForgotPassword() { 
    const navigate = useNavigate(); 
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<PasswordValue>({
        resolver: zodResolver(PasswordSchema),
    });

    const onSubmit = async (data: PasswordValue) => {
        setError(null);
        try {
            const res = await api.post('/forgot-password', data);
            if (res.status === 200) {
                // Optionally show success message
                navigate('/login');
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
            <Form.Root 
                className="p-8 fixed max-w-md w-full top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white rounded-xl border border-solid border-[#11181C]"
                onSubmit={handleSubmit(onSubmit)}
            >
                {error && <div className="text-red-600 mb-4">{error}</div>}
                
                <Form.Field name='email' className='mb-4'>
                    <Form.Label className='text-[#11181C]'>Email</Form.Label>
                    <input
                        {...register("email")}
                        className={`box-border text-[#687076] inline-flex h-[44px] w-full appearance-none items-center justify-center rounded px-2.5 outline-none border border-solid border-[#687076] caret-zinc-500 ${errors.email ? 'border-red-600' : ''}`}
                        type="email"
                    />
                    {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                </Form.Field>

                <Form.Submit asChild className='mb-6'>
                    <Button text='Send'/>
                </Form.Submit> 
            </Form.Root> 
        </>
    );
}
