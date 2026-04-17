import React, { useState, useEffect } from 'react';

export interface InputProps {
    value?: string;
    type?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'success' | 'warning' | 'error';
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
    value = '',
    type = 'text',
    name = '',
    label = '',
    placeholder = '',
    disabled = false,
    size = 'md',
    variant = 'default',
    onInput
}) => {
    const [inputId, setInputId] = useState('');

    useEffect(() => {
        setInputId(`input-${Math.random().toString(36).substr(2, 9)}`);
    }, []);

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'px-3 py-1.5 text-sm';
            case 'lg':
                return 'px-5 py-3 text-base';
            default:
                return 'px-4 py-2 text-sm';
        }
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'success':
                return 'border-success focus-visible:border-success';
            case 'warning':
                return 'border-warning focus-visible:border-warning';
            case 'error':
                return 'border-error focus-visible:border-error';
            default:
                return 'border-input-border focus-visible:border-input-border';
        }
    };

    const inputClasses = [
        'focus-ring w-full rounded-md transition-colors duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-base-200',
        getSizeClasses(),
        getVariantClasses(),
    ].join(' ');

    const labelClasses = 'block text-sm font-medium text-primary mb-1';

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        if (onInput) {
            onInput(event);
        }
    };

    return (
        <div>
            {label && (
                <label htmlFor={inputId} className={labelClasses}>
                    {label}
                </label>
            )}
            <input
                id={inputId}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                className={inputClasses}
                onInput={handleInput}
            />
        </div>
    );
};

export default Input;
