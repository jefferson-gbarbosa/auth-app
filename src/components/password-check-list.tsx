import { SquareCheck, X } from 'lucide-react';
import React from 'react';

interface PasswordChecklistProps {
    password: string;
}
export const PasswordCheckList: React.FC<PasswordChecklistProps> = ({ password }) => {
    const checks = [
        { test: password.length >= 8, text: 'At least 8 characters' },
        { test: /[A-Z]/.test(password), text: 'At least one uppercase letter' },
        { test: /[a-z]/.test(password), text: 'At least one lowercase letter' },
        { test: /[0-9]/.test(password), text: 'At least one number' },
        { test: /[!@#$%^&*]/.test(password), text: 'At least one special character' },
      ];

    return (
        <div className='mt-2 space-y-1'>
            {checks.map((check, index) => (
                <div key={index} className='flex items-center text-xs'>
                    {check.test ? (
                        <SquareCheck size={16} className='size-4 text-[#2B805A] mr-2' />
                    ) : (
                        <X size={16} className='text-[#687076] mr-2' />
                    )}
                    <span className={check.test ? "text-[#2B805A] text-sm" : "text-[#687076] text-sm"}>
                        {check.text}
                    </span>
                </div>
            ))}
      </div>
    );
};
