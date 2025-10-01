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
                // Primary color scale
                primary: {
                    50: 'rgb(240 249 255)', // lightest
                    100: 'rgb(219 234 254)',
                    200: 'rgb(191 219 254)',
                    300: 'rgb(147 197 253)',
                    400: 'rgb(96 165 250)',
                    500: 'rgb(59 130 246)', // base
                    600: 'rgb(37 99 235)',
                    700: 'rgb(29 78 216)',
                    800: 'rgb(30 64 175)',
                    900: 'rgb(30 58 138)',
                    950: 'rgb(23 37 84)', // darkest
                },
                // Secondary color scale
                secondary: {
                    50: 'rgb(245 243 255)',
                    100: 'rgb(237 233 254)',
                    200: 'rgb(221 214 254)',
                    300: 'rgb(196 181 253)',
                    400: 'rgb(147 51 234)',
                    500: 'rgb(124 58 237)',
                    600: 'rgb(109 40 217)',
                    700: 'rgb(91 33 182)',
                    800: 'rgb(76 29 149)',
                    900: 'rgb(59 7 100)',
                    950: 'rgb(36 4 66)',
                },
                // Neutral/Gray scale with dark mode variants
                neutral: {
                    50: 'rgb(250 250 250)', // light mode
                    100: 'rgb(245 245 245)',
                    200: 'rgb(229 229 229)',
                    300: 'rgb(212 212 212)',
                    400: 'rgb(163 163 163)',
                    500: 'rgb(115 115 115)',
                    600: 'rgb(82 82 82)',
                    700: 'rgb(64 64 64)',
                    800: 'rgb(38 38 38)',
                    900: 'rgb(23 23 23)',
                    950: 'rgb(10 10 10)',
                },
                // Semantic colors with dark mode support
                success: {
                    50: 'rgb(240 253 244)',
                    100: 'rgb(220 252 231)',
                    200: 'rgb(187 247 208)',
                    300: 'rgb(134 239 172)',
                    400: 'rgb(74 222 128)',
                    500: 'rgb(34 197 94)',
                    600: 'rgb(22 163 74)',
                    700: 'rgb(21 128 61)',
                    800: 'rgb(22 101 52)',
                    900: 'rgb(20 83 45)',
                    950: 'rgb(5 46 22)',
                },
                warning: {
                    50: 'rgb(255 251 235)',
                    100: 'rgb(254 243 199)',
                    200: 'rgb(253 230 138)',
                    300: 'rgb(252 211 77)',
                    400: 'rgb(251 191 36)',
                    500: 'rgb(245 158 11)',
                    600: 'rgb(217 119 6)',
                    700: 'rgb(180 83 9)',
                    800: 'rgb(146 64 14)',
                    900: 'rgb(120 53 15)',
                    950: 'rgb(69 26 3)',
                },
                error: {
                    50: 'rgb(254 242 242)',
                    100: 'rgb(254 226 226)',
                    200: 'rgb(254 202 202)',
                    300: 'rgb(252 165 165)',
                    400: 'rgb(248 113 113)',
                    500: 'rgb(239 68 68)',
                    600: 'rgb(220 38 38)',
                    700: 'rgb(185 28 28)',
                    800: 'rgb(153 27 27)',
                    900: 'rgb(127 29 29)',
                    950: 'rgb(69 10 10)',
                },
                // Background and surface colors with dark mode variants
                background: {
                    primary: 'rgb(255 255 255)', // light mode
                    secondary: 'rgb(249 250 251)',
                    tertiary: 'rgb(243 244 246)',
                    // Dark mode variants
                    'primary-dark': 'rgb(10 10 10)',
                    'secondary-dark': 'rgb(23 23 23)',
                    'tertiary-dark': 'rgb(38 38 38)',
                },
                surface: {
                    primary: 'rgb(255 255 255)',
                    secondary: 'rgb(249 250 251)',
                    tertiary: 'rgb(243 244 246)',
                    elevated: 'rgb(255 255 255)',
                    // Dark mode variants
                    'primary-dark': 'rgb(23 23 23)',
                    'secondary-dark': 'rgb(38 38 38)',
                    'tertiary-dark': 'rgb(64 64 64)',
                    'elevated-dark': 'rgb(38 38 38)',
                },
                // Text colors with dark mode variants
                text: {
                    primary: 'rgb(10 10 10)',
                    secondary: 'rgb(64 64 64)',
                    tertiary: 'rgb(115 115 115)',
                    inverse: 'rgb(255 255 255)',
                    // Dark mode variants
                    'primary-dark': 'rgb(250 250 250)',
                    'secondary-dark': 'rgb(212 212 212)',
                    'tertiary-dark': 'rgb(163 163 163)',
                },
                // Border colors with dark mode variants
                border: {
                    primary: 'rgb(229 229 229)',
                    secondary: 'rgb(212 212 212)',
                    focus: 'rgb(59 130 246)',
                    // Dark mode variants
                    'primary-dark': 'rgb(64 64 64)',
                    'secondary-dark': 'rgb(82 82 82)',
                    'focus-dark': 'rgb(96 165 250)',
                }
            },
            spacing: {
                // Extended spacing scale
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
                // Extended border radius scale
                'none': '0px',
                'sm': '0.125rem',   // 2px
                'DEFAULT': '0.25rem', // 4px
                'md': '0.375rem',   // 6px
                'lg': '0.5rem',     // 8px
                'xl': '0.75rem',    // 12px
                '2xl': '1rem',      // 16px
                '3xl': '1.5rem',    // 24px
                '4xl': '2rem',      // 32px
                'full': '9999px',
            },
            boxShadow: {
                // Extended shadow scale
                'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
                'none': 'none',
                // Dark mode shadows
                'dark-sm': '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)',
                'dark-md': '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
                'dark-lg': '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
                'dark-xl': '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
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
            },
            zIndex: {
                // Extended z-index scale
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
                'modal': '1000',
                'popover': '1010',
                'tooltip': '1020',
                'notification': '1030',
            }
        }
    },
    plugins: []
};