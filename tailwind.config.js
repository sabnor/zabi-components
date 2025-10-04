/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{html,js,svelte,ts}',
        './.storybook/**/*.{html,js,svelte,ts}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Semantic color system with built-in light/dark mode support

                // Primary colors
                primary: {
                    DEFAULT: 'rgb(var(--color-primary))',
                    hover: 'rgb(var(--color-primary-hover))',
                    active: 'rgb(var(--color-primary-active))',
                    disabled: 'rgb(var(--color-primary-disabled))',
                    light: 'rgb(var(--color-primary-light))',
                    dark: 'rgb(var(--color-primary-dark))',
                },

                // Secondary colors
                secondary: {
                    DEFAULT: 'rgb(var(--color-secondary))',
                    hover: 'rgb(var(--color-secondary-hover))',
                    active: 'rgb(var(--color-secondary-active))',
                    disabled: 'rgb(var(--color-secondary-disabled))',
                    light: 'rgb(var(--color-secondary-light))',
                    dark: 'rgb(var(--color-secondary-dark))',
                },

                // Success colors
                success: {
                    DEFAULT: 'rgb(var(--color-success))',
                    hover: 'rgb(var(--color-success-hover))',
                    active: 'rgb(var(--color-success-active))',
                    disabled: 'rgb(var(--color-success-disabled))',
                    light: 'rgb(var(--color-success-light))',
                    dark: 'rgb(var(--color-success-dark))',
                    surface: 'rgb(var(--color-success-surface))',
                    text: 'rgb(var(--color-success-text))',
                },

                // Warning colors
                warning: {
                    DEFAULT: 'rgb(var(--color-warning))',
                    hover: 'rgb(var(--color-warning-hover))',
                    active: 'rgb(var(--color-warning-active))',
                    disabled: 'rgb(var(--color-warning-disabled))',
                    light: 'rgb(var(--color-warning-light))',
                    dark: 'rgb(var(--color-warning-dark))',
                    surface: 'rgb(var(--color-warning-surface))',
                    text: 'rgb(var(--color-warning-text))',
                },

                // Error colors
                error: {
                    DEFAULT: 'rgb(var(--color-error))',
                    hover: 'rgb(var(--color-error-hover))',
                    active: 'rgb(var(--color-error-active))',
                    disabled: 'rgb(var(--color-error-disabled))',
                    light: 'rgb(var(--color-error-light))',
                    dark: 'rgb(var(--color-error-dark))',
                    surface: 'rgb(var(--color-error-surface))',
                    text: 'rgb(var(--color-error-text))',
                },

                // Info colors
                info: {
                    DEFAULT: 'rgb(var(--color-info))',
                    hover: 'rgb(var(--color-info-hover))',
                    active: 'rgb(var(--color-info-active))',
                    disabled: 'rgb(var(--color-info-disabled))',
                    light: 'rgb(var(--color-info-light))',
                    dark: 'rgb(var(--color-info-dark))',
                    surface: 'rgb(var(--color-info-surface))',
                    text: 'rgb(var(--color-info-text))',
                },

                // Focus colors
                focus: {
                    DEFAULT: 'rgb(var(--color-focus))',
                    hover: 'rgb(var(--color-focus-hover))',
                    active: 'rgb(var(--color-focus-active))',
                    disabled: 'rgb(var(--color-focus-disabled))',
                    light: 'rgb(var(--color-focus-light))',
                    dark: 'rgb(var(--color-focus-dark))',
                    surface: 'rgb(var(--color-focus-surface))',
                    text: 'rgb(var(--color-focus-text))',
                    ring: 'rgb(var(--color-focus-ring))',
                    'ring-offset': 'rgb(var(--color-focus-ring-offset))',
                },

                // Background colors (automatically switch with dark mode)
                background: {
                    DEFAULT: 'rgb(var(--color-background))',
                    secondary: 'rgb(var(--color-background-secondary))',
                    tertiary: 'rgb(var(--color-background-tertiary))',
                },

                // Page colors
                page: {
                    DEFAULT: 'rgb(var(--color-page))',
                    secondary: 'rgb(var(--color-page-secondary))',
                },

                // Card colors
                card: {
                    DEFAULT: 'rgb(var(--color-card))',
                    hover: 'rgb(var(--color-card-hover))',
                    active: 'rgb(var(--color-card-active))',
                    elevated: 'rgb(var(--color-card-elevated))',
                },

                // Surface colors (automatically switch with dark mode)
                surface: {
                    DEFAULT: 'rgb(var(--color-surface))',
                    secondary: 'rgb(var(--color-surface-secondary))',
                    tertiary: 'rgb(var(--color-surface-tertiary))',
                    elevated: 'rgb(var(--color-surface-elevated))',
                    hover: 'rgb(var(--color-surface-hover))',
                    active: 'rgb(var(--color-surface-active))',
                    inverse: 'rgb(var(--color-surface-inverse))',
                    disabled: 'rgb(var(--color-surface-disabled))',
                },

                // Text colors (automatically switch with dark mode)
                text: {
                    DEFAULT: 'rgb(var(--color-text))',
                    secondary: 'rgb(var(--color-text-secondary))',
                    tertiary: 'rgb(var(--color-text-tertiary))',
                    inverse: 'rgb(var(--color-text-inverse))',
                    disabled: 'rgb(var(--color-text-disabled))',
                    placeholder: 'rgb(var(--color-text-placeholder))',
                },

                // Border colors (automatically switch with dark mode)
                border: {
                    DEFAULT: 'rgb(var(--color-border))',
                    secondary: 'rgb(var(--color-border-secondary))',
                    hover: 'rgb(var(--color-border-hover))',
                    focus: 'rgb(var(--color-border-focus))',
                    disabled: 'rgb(var(--color-border-disabled))',
                },
            },
            ringColor: {
                // Semantic ring colors
                'primary': 'rgb(var(--color-focus-ring))',
                'secondary': 'rgb(var(--color-secondary))',
                'success': 'rgb(var(--color-success))',
                'warning': 'rgb(var(--color-warning))',
                'error': 'rgb(var(--color-error))',
                'info': 'rgb(var(--color-info))',
                'focus': 'rgb(var(--color-focus))',
            },
            ringOffsetColor: {
                // Semantic ring offset colors
                'primary': 'rgb(var(--color-focus-ring-offset))',
                'surface': 'rgb(var(--color-surface))',
                'background': 'rgb(var(--color-background))',
            },
            ringOffsetWidth: {
                '0': '0px',
                '1': '1px',
                '2': '2px',
                '4': '4px',
                '8': '8px',
            },
            placeholderColor: {
                // Semantic placeholder colors
                'primary': 'rgb(var(--color-text))',
                'secondary': 'rgb(var(--color-text-secondary))',
                'tertiary': 'rgb(var(--color-text-tertiary))',
                'placeholder': 'rgb(var(--color-text-placeholder))',
                'disabled': 'rgb(var(--color-text-disabled))',
            },
            spacing: {
                // Semantic spacing tokens (primary usage)
                'xs': 'var(--spacing-xs)',
                'sm': 'var(--spacing-sm)',
                'md': 'var(--spacing-md)',
                'lg': 'var(--spacing-lg)',
                'xl': 'var(--spacing-xl)',
                '2xl': 'var(--spacing-2xl)',

                // Extended spacing scale (for backward compatibility)
                '18': '4.5rem',   // 72px
                '88': '22rem',    // 352px
                '128': '32rem',   // 512px
                '144': '36rem',   // 576px
                '160': '40rem',   // 640px
                '176': '44rem',   // 704px
                '192': '48rem',   // 768px
                '208': '52rem',   // 832px
                '224': '56rem',   // 896px
                '240': '60rem',   // 960px
                '256': '64rem',   // 1024px
                '288': '72rem',   // 1152px
                '320': '80rem',   // 1280px
                '384': '96rem',   // 1536px
            },
            fontSize: {
                // Extended typography scale
                '2xs': ['0.625rem', { lineHeight: '0.75rem' }], // 10px
                'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
                'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
                '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
                '5xl': ['3rem', { lineHeight: '1' }],           // 48px
                '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
                '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px
                '8xl': ['6rem', { lineHeight: '1' }],           // 96px
                '9xl': ['8rem', { lineHeight: '1' }],           // 128px
            },
            borderRadius: {
                // Semantic border radius tokens (primary usage)
                'sm': 'var(--radius-sm)',
                'md': 'var(--radius-md)',
                'lg': 'var(--radius-lg)',
                'xl': 'var(--radius-xl)',

                // Extended border radius scale (for backward compatibility)
                'none': '0px',
                'DEFAULT': '0.25rem', // 4px
                '2xl': '1rem',      // 16px
                '3xl': '1.5rem',    // 24px
                '4xl': '2rem',      // 32px
                'full': '9999px',
            },
            boxShadow: {
                // Semantic shadow tokens (primary usage)
                'adaptive-xs': 'var(--shadow-xs)',
                'adaptive-sm': 'var(--shadow-sm)',
                'adaptive-md': 'var(--shadow-md)',
                'adaptive-lg': 'var(--shadow-lg)',
                'adaptive-xl': 'var(--shadow-xl)',
                'adaptive-2xl': 'var(--shadow-2xl)',

                // Legacy shadow scale (for backward compatibility)
                'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
                'none': 'none',
            },
            animation: {
                // Extended animation scale
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'fade-out': 'fadeOut 0.5s ease-in-out',
                'slide-in-up': 'slideInUp 0.3s ease-out',
                'slide-in-down': 'slideInDown 0.3s ease-out',
                'slide-in-left': 'slideInLeft 0.3s ease-out',
                'slide-in-right': 'slideInRight 0.3s ease-out',
                'scale-in': 'scaleIn 0.2s ease-out',
                'scale-out': 'scaleOut 0.2s ease-in',
                'bounce-gentle': 'bounceGentle 2s infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',

                // Modern animations
                'fade-in-modern': 'fadeIn 0.3s ease-out',
                'slide-up-modern': 'slideUp 0.3s ease-out',
                'scale-in-modern': 'scaleIn 0.2s ease-out',
                'slide-down-modern': 'slideDown 0.3s ease-out',
                'slide-left-modern': 'slideLeft 0.3s ease-out',
                'slide-right-modern': 'slideRight 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                slideInUp: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInDown: {
                    '0%': { transform: 'translateY(-100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInLeft: {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                scaleOut: {
                    '0%': { transform: 'scale(1)', opacity: '1' },
                    '100%': { transform: 'scale(0.9)', opacity: '0' },
                },
                bounceGentle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideLeft: {
                    '0%': { transform: 'translateX(20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideRight: {
                    '0%': { transform: 'translateX(-20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
            },
            zIndex: {
                // Semantic z-index tokens (primary usage)
                'dropdown': 'var(--z-dropdown)',
                'sticky': 'var(--z-sticky)',
                'fixed': 'var(--z-fixed)',
                'modal-backdrop': 'var(--z-modal-backdrop)',
                'modal': 'var(--z-modal)',
                'popover': 'var(--z-popover)',
                'tooltip': 'var(--z-tooltip)',
                'toast': 'var(--z-toast)',

                // Extended z-index scale (for backward compatibility)
                '0': '0',
                '10': '10',
                '20': '20',
                '30': '30',
                '40': '40',
                '50': '50',
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
                'auto': 'auto',
            }
        }
    },
    plugins: []
};