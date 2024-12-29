import React from 'react';

interface ButtonProps {
    disabled?: boolean;
    text?:string
}

export const Button: React.FC<ButtonProps> = ({ disabled, text }) => {
    return (
        <button 
        disabled={disabled}
          className={`
            w-full 
            p-3 
            mb-4 
            text-base 
            font-semibold 
            outline-none 
            rounded-lg 
            cursor-pointer 
            transition-transform 
            duration-300 
            ease-in-out 
            transform 
            ${disabled 
                ? 'bg-gray-400 text-gray-300 cursor-not-allowed' // Estilo para o botão desativado
                : 'bg-[#2B805A] text-white hover:text-[#11181C] hover:scale-105 ' // Estilo para o botão ativo
            }
        `}
        >
            {text}
        </button>
    );
};

