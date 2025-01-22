import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import * as Form from "@radix-ui/react-form";
import { SubmitHandler, useForm} from 'react-hook-form'; 
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Button } from '../components/button';
import { AxiosError } from 'axios';
import { Header } from '../components/header';
import { api } from '../services/axios';

const OTPValues = z.object({
	otp: z
	  .string()
	  .min(6, { message: 'OTP must be 6 digits' })
	  .length(6, { message: 'OTP must be 6 digits' })
	  .regex(/^\d{6}$/, { message: 'OTP must contain only numbers' }),
});

type OTPValues = z.infer<typeof OTPValues>;

export function EmailVerification() {
	const [otp, setOtp] =useState<string[]>(["", "", "", "", "", ""])
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true); 
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const navigate = useNavigate();

	const { register,handleSubmit,setValue, formState: { errors } } = useForm<OTPValues>({
		resolver: zodResolver(OTPValues),
	});
	
	const handleChange = (index: number, value: string) =>{
		const newOtp = [...otp];
	    if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newOtp[i] = pastedCode[i] || "";
			}
			setOtp(newOtp);
			setValue('otp', newOtp.join(''));
		// Focando no primeiro campo vazio após o código ser colado
			const firstEmptyIndex = newOtp.findIndex((digit) => digit === '');
			if (firstEmptyIndex !== -1) {
			  inputRefs.current[firstEmptyIndex]?.focus();
			}
		} else {
			newOtp[index] = value;
			setOtp(newOtp);
			setValue('otp', newOtp.join(''));
			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1]?.focus();
			}
		}
		// Move focus to next input if value is entered
		if (value && index < 5) {
		inputRefs.current[index + 1]?.focus();
		}
	}

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const onSubmit: SubmitHandler<OTPValues> = async (data:  OTPValues) => {	
		const otpvalue = { code: data.otp };
		setLoading(true);
		setError(null);
		try {
			const res = await api.post('/verify-email', otpvalue);
			
			if(res.status === 200){
				 toast.success('Email verified successfully', {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				setTimeout(()=>{
					navigate("/");
				},4000)	
			} else {
			   toast.error("Failed to verify email. Please try again.");  // Show error toast if status isn't 200
			}	
		} catch (err) {
			if (err instanceof AxiosError) {
				const message = err.response?.data?.message || 'An error occurred';
				setError(message);
			  } else {
				setError('An unexpected error occurred');
			  }
		} finally {
			setLoading(false);  // Always stop loading state, whether successful or not
		}
	};

	// Função para verificar se todos os campos de OTP estão preenchidos corretamente
	useEffect(() => {
		const isValidOtp = otp.every((digit) => digit !== "");  // Verifica se todos os campos têm valor
		setIsButtonDisabled(!isValidOtp); // Desabilita o botão se algum campo estiver vazio
	}, [otp]);

	return (
		<>
		    <Header />
			<Form.Root 
				className="p-8 sm:p-6 md:p-8 fixed w-11/12 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white rounded-xl border border-solid border-[#11181C] sm:max-w-sm md:max-w-md lg:max-w-lg"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2 className='text-xl sm:text-2xl md:text-3xl mb-3 border-[#11181C]'>Verify Your Email</h2>
				<p className='inline-block text-base mb-4 text-[#687076]'>Enter the 6-digit code sent to your email address.</p>
				<div className='flex justify-between mb-3' >
					{otp.map((digit, index) => (
						<input
							{...register("otp")}
							type="text"
							key={index}
							ref={(el) => (inputRefs.current[index] = el)}
							value={digit}
							onChange={(e) => handleChange(index, e.target.value)}
							onKeyDown={(e) => handleKeyDown(index, e)}
							className='w-12 h-12 text-center text-[#687076] text-2xl font-bold  border-2 border-gray-600 rounded-lg focus:border-[#2B805A] focus:outline-none'
						/>
					))}
				</div> 
				{errors.otp && <span className="text-red-600 mb-2 block">{errors.otp.message}</span>}
				<Form.Submit asChild className='mb-3'>
					<Button disabled={loading || isButtonDisabled} text={loading ? 'Verifying...' : 'Verify Email'} />
				</Form.Submit>
				{error && <div className="text-red-600 mt-4 text-center">{error}</div>} 
			</Form.Root>
		</>
	);
}


