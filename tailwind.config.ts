import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                'text-primary': '#000000',
                'text-secondary': '#FFFFFF',
                'primary-color': '#FFFFFF',
                'secondary-color': '#050c28',
                'triary-color': '#ebebeb'
            }
        }
    },
    plugins: [
        require('tailwindcss-animate'),
        nextui({
            themes: {
                light: {
                    colors: {
                        primary: {
                            50: '#fff3da',
                            100: '#FEF0CB',
                            200: '#FDDE98',
                            300: '#FBC564',
                            400: '#F7AC3D',
                            500: '#F38600',
                            600: '#D06900',
                            700: '#AE5000',
                            800: '#8C3A00',
                            900: '#742B00',
                            foreground: '#FFFFFF',
                            DEFAULT: '#F38600',
                        },
                        focus: '#F38600',
                    }
                }
            }
        })
    ]
}

export default config
