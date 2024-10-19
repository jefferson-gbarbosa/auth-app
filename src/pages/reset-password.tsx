import { useState } from 'react';
import { api } from '../api/axios';
import * as Form from "@radix-ui/react-form";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Button } from '../components/button';

const ResetPasswordSchema = z.object({
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
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
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(ResetPasswordSchema)
    });
    const { token } = useParams<{ token: string }>();

    const onSubmit = async (data: ResetPasswordSchema) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.post(`/reset-password/${token}`, data);
            if (res.status === 200) {
                navigate('/login');
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
            <Form.Root 
                className="p-8 fixed max-w-md w-full top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white rounded-xl border border-solid border-[#11181C]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className='text-3xl mb-0.5 border-[#11181C]'>Reset account password</h2>
                <p className='inline-block text-base mb-4 text-[#687076]'>Enter a new password for noreply@shopify.com</p>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                
                <Form.Field name='password' className='mb-6'>
                    <Form.Label className='text-[#11181C]'>Password</Form.Label>
                    <input
                        {...register("password", { required: "Password is required" })}
                        className={`box-border text-[#687076] inline-flex h-[44px] w-full appearance-none items-center justify-center rounded px-2.5 outline-none border border-solid border-[#687076] caret-zinc-500 ${errors.password ? 'border-red-600' : ''}`}
                        type="password"
                        aria-invalid={errors.password ? "true" : "false"}
                    />
                    {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                </Form.Field>

                <Form.Submit asChild className='mb-6'>
                    <Button  disabled={loading} text = {loading ? 'Updating...' : 'Update'} />
                </Form.Submit>
            </Form.Root>
        </>
    );
}
