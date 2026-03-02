/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1a6b8c',
                    dark: '#134e66',
                    light: '#2d97a2',
                },
                secondary: {
                    DEFAULT: '#64748b',
                    dark: '#475569',
                    light: '#94a3b8',
                },
                accent: '#f59e0b',
                success: '#10b981',
                error: '#ef4444',
                warning: '#f59e0b',
                background: '#f8fafc',
                sidebar: '#1a6b8c',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
