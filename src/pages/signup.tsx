import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Form from "@radix-ui/react-form";
import { api } from '../api/axios';
import { useForm} from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { LockKeyhole, Mail, SquareUser } from 'lucide-react';
import { Button } from '../components/button';
import { PasswordCheckList } from '../components/password-check-list';
import { toast } from 'react-toastify';


const SignupValues = z.object({
    name: z.string().min(1, { message: 'This is required' }),
    email: z.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
    password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(32, "Password must be at most 32 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
})

type SignupValues = z.infer<typeof SignupValues>

export function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState<string>('');
    const { register, handleSubmit, formState: { errors } } = useForm<SignupValues>({
        resolver:zodResolver(SignupValues)
    });


    async function onSubmit(data: SignupValues) {
        setLoading(true);
        setError(null);

        try {
            const res = await api.post('/signup', data);
            if (res.status === 200) {
                // const message = res.data?.message;
                // message.success(res.data.message || 'Registration successful');
                navigate('/login');
                toast.success("Registration completed!")
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                const message = err.response?.data?.message || 'Invalid data';
                setError(message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form.Root 
                className="p-8 fixed max-w-md w-full top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white rounded-xl border border-solid border-[#11181C]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className='text-3xl mb-3 border-[#11181C]'>Sign up</h2>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                
                <Form.Field name='name' className='mb-4'>
                    <Form.Label className='text-[#11181C]'>Nome</Form.Label>

                    <div className='relative'>
                       <SquareUser size={20} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"/>
                        <input
                         {...register("name", { required: "Please input your Name" })}
                         className={`box-border text-[#687076] inline-flex h-[44px] w-full appearance-none items-center justify-center rounded px-10 outline-none border border-solid border-[#687076] caret-zinc-500 ${errors.email ? 'border-red-600' : ''}`}
                         type="text" 
                         placeholder="Enter your name" 
                        />
                    </div>
                    {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                </Form.Field>
          
                <Form.Field name='email' className='mb-4'>
                    <Form.Label className='text-[#11181C]'>Email</Form.Label>
                    <div className="relative">
                        <Mail size={20}  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            {...register("email", { required: "Email is required" })}
                            className={`box-border text-[#687076] inline-flex h-[44px] w-full appearance-none items-center justify-center rounded px-10 outline-none border border-solid border-[#687076] caret-zinc-500 ${errors.email ? 'border-red-600' : ''}`}
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>
                  
                    {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                </Form.Field>

                <Form.Field name='password' className='mb-6'>
                    <Form.Label className='text-[#11181C]'>Password</Form.Label>
                    <div className="relative">
                        <LockKeyhole size={20}  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                        {...register("password", { required: "Password is required" })}
                        className={`box-border text-[#687076] inline-flex h-[44px] w-full appearance-none items-center justify-center rounded px-10 outline-none border border-solid border-[#687076] caret-zinc-500 ${errors.password ? 'border-red-600' : ''}`}
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                </Form.Field>
                <div className='mb-6 px-2.5'>
                  <PasswordCheckList password={password}/>
                </div>
                <Form.Submit asChild className='mb-6'>
                    <Button disabled={loading} text={loading ? ' Signup Now in...' : ' Signup Now'}/>
                </Form.Submit>
                <div className='text-center text-sm'>
                    Already have an account? <Link to="/login" className='text-[#11181C] cursor-pointer hover:underline hover:text-[#687076]'>Login</Link>
                </div>
            </Form.Root>
    );
}
