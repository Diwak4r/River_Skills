/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                background: "rgb(var(--background) / <alpha-value>)",
                surface: "rgb(var(--surface) / <alpha-value>)",
                "surface-hover": "rgb(var(--surface-hover) / <alpha-value>)",
                border: "rgb(var(--border) / <alpha-value>)",
                primary: "rgb(var(--primary) / <alpha-value>)",
                "primary-foreground": "rgb(var(--primary-foreground) / <alpha-value>)",
                accent: "rgb(var(--accent) / <alpha-value>)",
                "accent-foreground": "rgb(var(--accent-foreground) / <alpha-value>)",
                "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
                "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
            },
        },
    },
    plugins: [],
}
