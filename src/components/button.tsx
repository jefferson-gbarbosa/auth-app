import React from 'react';

interface ButtonProps {
    disabled?: boolean;
    text?:string
}

export const Button: React.FC<ButtonProps> = ({ disabled, text }) => {
    return (
        <button 
        disabled={disabled}
          className="w-full p-3 mb-4 text-white text-base font-semibold bg-[#2B805A] outline-none rounded-lg border-2 border-solid cursor-pointer hover:text-[#11181C] transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
            {text}
        </button>
    );
};

