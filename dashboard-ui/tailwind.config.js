/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0b0e11", // Binance-like dark background
                surface: "#1e2329",    // Binance-like card background
                primary: "#FCD535",    // Binance Yellow
                secondary: "#474D57",  // Text secondary
                success: "#0ECB81",    // Green
                danger: "#F6465D",     // Red
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
