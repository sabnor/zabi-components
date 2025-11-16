import React from 'react';

export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'brand';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    disabled = false,
    type = 'button',
    className = '',
    onClick,
    children
}) => {
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'px-3 py-1.5 text-sm font-medium';
            case 'lg':
                return 'px-6 py-3 text-base font-semibold';
            default:
                return 'px-4 py-2 text-sm font-medium';
        }
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return 'bg-base-100 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400';
            case 'secondary':
                return 'bg-base-600 text-white hover:bg-base-700 active:bg-base-800 focus:ring-2 focus:ring-base-500 focus:ring-offset-2 disabled:bg-base-400';
            case 'danger':
                return 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400';
            case 'success':
                return 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400';
            case 'ghost':
                return 'bg-transparent text-base-700 hover:bg-base-100 active:bg-base-200 focus:ring-2 focus:ring-base-500 focus:ring-offset-2 disabled:text-base-400';
            case 'brand':
                return 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400';
            default:
                return 'bg-base-100 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400';
        }
    };

    const classes = [
        'inline-flex items-center justify-center rounded-md transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'active:scale-95 transform-gpu',
        'shadow-sm hover:shadow-md',
        getSizeClasses(),
        getVariantClasses(),
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
