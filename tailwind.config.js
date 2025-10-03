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
                // Base color scales (for reference and advanced usage)
                primary: {
                    50: 'var(--color-primary-50)',
                    100: 'var(--color-primary-100)',
                    200: 'var(--color-primary-200)',
                    300: 'var(--color-primary-300)',
                    400: 'var(--color-primary-400)',
                    500: 'var(--color-primary-500)',
                    600: 'var(--color-primary-600)',
                    700: 'var(--color-primary-700)',
                    800: 'var(--color-primary-800)',
                    900: 'var(--color-primary-900)',
                    950: 'var(--color-primary-950)',
                },
                secondary: {
                    50: 'var(--color-secondary-50)',
                    100: 'var(--color-secondary-100)',
                    200: 'var(--color-secondary-200)',
                    300: 'var(--color-secondary-300)',
                    400: 'var(--color-secondary-400)',
                    500: 'var(--color-secondary-500)',
                    600: 'var(--color-secondary-600)',
                    700: 'var(--color-secondary-700)',
                    800: 'var(--color-secondary-800)',
                    900: 'var(--color-secondary-900)',
                    950: 'var(--color-secondary-950)',
                },
                neutral: {
                    50: 'var(--color-neutral-50)',
                    100: 'var(--color-neutral-100)',
                    200: 'var(--color-neutral-200)',
                    300: 'var(--color-neutral-300)',
                    400: 'var(--color-neutral-400)',
                    500: 'var(--color-neutral-500)',
                    600: 'var(--color-neutral-600)',
                    700: 'var(--color-neutral-700)',
                    800: 'var(--color-neutral-800)',
                    900: 'var(--color-neutral-900)',
                    950: 'var(--color-neutral-950)',
                },
                success: {
                    50: 'var(--color-success-50)',
                    100: 'var(--color-success-100)',
                    200: 'var(--color-success-200)',
                    300: 'var(--color-success-300)',
                    400: 'var(--color-success-400)',
                    500: 'var(--color-success-500)',
                    600: 'var(--color-success-600)',
                    700: 'var(--color-success-700)',
                    800: 'var(--color-success-800)',
                    900: 'var(--color-success-900)',
                    950: 'var(--color-success-950)',
                },
                warning: {
                    50: 'var(--color-warning-50)',
                    100: 'var(--color-warning-100)',
                    200: 'var(--color-warning-200)',
                    300: 'var(--color-warning-300)',
                    400: 'var(--color-warning-400)',
                    500: 'var(--color-warning-500)',
                    600: 'var(--color-warning-600)',
                    700: 'var(--color-warning-700)',
                    800: 'var(--color-warning-800)',
                    900: 'var(--color-warning-900)',
                    950: 'var(--color-warning-950)',
                },
                error: {
                    50: 'var(--color-error-50)',
                    100: 'var(--color-error-100)',
                    200: 'var(--color-error-200)',
                    300: 'var(--color-error-300)',
                    400: 'var(--color-error-400)',
                    500: 'var(--color-error-500)',
                    600: 'var(--color-error-600)',
                    700: 'var(--color-error-700)',
                    800: 'var(--color-error-800)',
                    900: 'var(--color-error-900)',
                    950: 'var(--color-error-950)',
                },
                info: {
                    50: 'var(--color-info-50)',
                    100: 'var(--color-info-100)',
                    200: 'var(--color-info-200)',
                    300: 'var(--color-info-300)',
                    400: 'var(--color-info-400)',
                    500: 'var(--color-info-500)',
                    600: 'var(--color-info-600)',
                    700: 'var(--color-info-700)',
                    800: 'var(--color-info-800)',
                    900: 'var(--color-info-900)',
                    950: 'var(--color-info-950)',
                },

                // Semantic color tokens (primary usage)
                primary: 'rgb(var(--color-primary))',
                'primary-hover': 'rgb(var(--color-primary-hover))',
                'primary-active': 'rgb(var(--color-primary-active))',
                'primary-disabled': 'rgb(var(--color-primary-disabled))',
                'primary-light': 'rgb(var(--color-primary-light))',
                'primary-dark': 'rgb(var(--color-primary-dark))',

                secondary: 'rgb(var(--color-secondary))',
                'secondary-hover': 'rgb(var(--color-secondary-hover))',
                'secondary-active': 'rgb(var(--color-secondary-active))',
                'secondary-disabled': 'rgb(var(--color-secondary-disabled))',
                'secondary-light': 'rgb(var(--color-secondary-light))',
                'secondary-dark': 'rgb(var(--color-secondary-dark))',

                success: 'rgb(var(--color-success))',
                'success-hover': 'rgb(var(--color-success-hover))',
                'success-active': 'rgb(var(--color-success-active))',
                'success-disabled': 'rgb(var(--color-success-disabled))',
                'success-light': 'rgb(var(--color-success-light))',
                'success-dark': 'rgb(var(--color-success-dark))',
                'success-surface': 'rgb(var(--color-success-surface))',
                'success-text': 'rgb(var(--color-success-text))',

                warning: 'rgb(var(--color-warning))',
                'warning-hover': 'rgb(var(--color-warning-hover))',
                'warning-active': 'rgb(var(--color-warning-active))',
                'warning-disabled': 'rgb(var(--color-warning-disabled))',
                'warning-light': 'rgb(var(--color-warning-light))',
                'warning-dark': 'rgb(var(--color-warning-dark))',
                'warning-surface': 'rgb(var(--color-warning-surface))',
                'warning-text': 'rgb(var(--color-warning-text))',

                error: 'rgb(var(--color-error))',
                'error-hover': 'rgb(var(--color-error-hover))',
                'error-active': 'rgb(var(--color-error-active))',
                'error-disabled': 'rgb(var(--color-error-disabled))',
                'error-light': 'rgb(var(--color-error-light))',
                'error-dark': 'rgb(var(--color-error-dark))',
                'error-surface': 'rgb(var(--color-error-surface))',
                'error-text': 'rgb(var(--color-error-text))',

                info: 'rgb(var(--color-info))',
                'info-hover': 'rgb(var(--color-info-hover))',
                'info-active': 'rgb(var(--color-info-active))',
                'info-disabled': 'rgb(var(--color-info-disabled))',
                'info-light': 'rgb(var(--color-info-light))',
                'info-dark': 'rgb(var(--color-info-dark))',
                'info-surface': 'rgb(var(--color-info-surface))',
                'info-text': 'rgb(var(--color-info-text))',

                focus: 'rgb(var(--color-focus))',
                'focus-hover': 'rgb(var(--color-focus-hover))',
                'focus-active': 'rgb(var(--color-focus-active))',
                'focus-disabled': 'rgb(var(--color-focus-disabled))',
                'focus-light': 'rgb(var(--color-focus-light))',
                'focus-dark': 'rgb(var(--color-focus-dark))',
                'focus-surface': 'rgb(var(--color-focus-surface))',
                'focus-text': 'rgb(var(--color-focus-text))',

                // Background semantic tokens
                background: 'rgb(var(--color-background))',
                'background-secondary': 'rgb(var(--color-background-secondary))',
                'background-tertiary': 'rgb(var(--color-background-tertiary))',

                // Page semantic tokens
                page: 'rgb(var(--color-page))',
                'page-secondary': 'rgb(var(--color-page-secondary))',

                // Card semantic tokens
                card: 'rgb(var(--color-card))',
                'card-hover': 'rgb(var(--color-card-hover))',
                'card-active': 'rgb(var(--color-card-active))',
                'card-elevated': 'rgb(var(--color-card-elevated))',

                // Surface semantic tokens
                surface: 'rgb(var(--color-surface))',
                'surface-secondary': 'rgb(var(--color-surface-secondary))',
                'surface-tertiary': 'rgb(var(--color-surface-tertiary))',
                'surface-elevated': 'rgb(var(--color-surface-elevated))',
                'surface-hover': 'rgb(var(--color-surface-hover))',
                'surface-active': 'rgb(var(--color-surface-active))',
                'surface-inverse': 'rgb(var(--color-surface-inverse))',
                'surface-disabled': 'rgb(var(--color-surface-disabled))',

                // Text semantic tokens
                primary: 'rgb(var(--color-text))',
                secondary: 'rgb(var(--color-text-secondary))',
                tertiary: 'rgb(var(--color-text-tertiary))',
                inverse: 'rgb(var(--color-text-inverse))',
                disabled: 'rgb(var(--color-text-disabled))',
                placeholder: 'rgb(var(--color-text-placeholder))',

                // Border semantic tokens
                border: 'rgb(var(--color-border))',
                'border-secondary': 'rgb(var(--color-border-secondary))',
                'border-hover': 'rgb(var(--color-border-hover))',
                'border-focus': 'rgb(var(--color-border-focus))',
                'border-disabled': 'rgb(var(--color-border-disabled))',

                // Focus ring semantic tokens
                'focus-ring': 'rgb(var(--color-focus-ring))',
                'focus-ring-offset': 'rgb(var(--color-focus-ring-offset))',

                // Focus color (for ring colors)
                focus: 'rgb(var(--color-focus))',
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