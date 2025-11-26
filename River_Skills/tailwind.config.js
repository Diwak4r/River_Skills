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
                background: "var(--background)",
                surface: "var(--surface)",
                "surface-hover": "var(--surface-hover)",
                border: "var(--border)",
                primary: "var(--primary)",
                "primary-foreground": "var(--primary-foreground)",
                "text-primary": "var(--text-primary)",
                "text-secondary": "var(--text-secondary)",
            },
        },
    },
    plugins: [],
}
