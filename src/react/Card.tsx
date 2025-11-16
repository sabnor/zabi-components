import React from 'react';

export interface CardProps {
    title?: string;
    image?: string;
    interactive?: boolean;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md' | 'lg';
    children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
    title = '',
    image = '',
    interactive = false,
    variant = 'default',
    size = 'md',
    children
}) => {
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'p-3';
            case 'lg':
                return 'p-6';
            default:
                return 'p-4';
        }
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'success':
                return 'border-green-200 bg-green-50';
            case 'warning':
                return 'border-yellow-200 bg-yellow-50';
            case 'error':
                return 'border-red-200 bg-red-50';
            case 'info':
                return 'border-blue-200 bg-blue-50';
            default:
                return 'border-base-200 bg-white';
        }
    };

    const cardClasses = [
        'rounded-lg transition-all duration-200',
        'hover:shadow-adaptive-md',
        interactive ? 'cursor-pointer hover:scale-[1.02]' : '',
        getSizeClasses(),
        getVariantClasses(),
    ].join(' ');

    const titleClasses = 'text-lg font-semibold mb-2 text-primary';

    return (
        <div className={cardClasses}>
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                />
            )}

            {title && (
                <h3 className={titleClasses}>{title}</h3>
            )}

            {children}
        </div>
    );
};

export default Card;
