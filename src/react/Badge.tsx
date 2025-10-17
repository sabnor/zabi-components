import React from 'react';

export interface BadgeProps {
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    className?: string;
    children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
    variant = 'default',
    className = '',
    children
}) => {
    const getVariantClasses = () => {
        switch (variant) {
            case 'success':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'warning':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'error':
                return 'bg-red-100 text-red-800 border-red-300';
            case 'info':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const classes = [
        'inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md',
        getVariantClasses(),
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <span className={classes}>
            {children}
        </span>
    );
};

export default Badge;
