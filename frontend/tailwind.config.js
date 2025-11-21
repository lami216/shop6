/** @type {import('tailwindcss').Config} */
export default {
        content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
        theme: {
                extend: {
                        colors: {
                                "payzone-navy": "#0f3b2e", // أساس أخضر عميق يتماشى مع علم موريتانيا
                                "payzone-white": "#FFFFFF",
                                "payzone-gold": "#f2c745", // أصفر العلم
                                "payzone-indigo": "#d81e2f", // أحمر العلم
                                "bladi-green": "#0f5f45",
                                "bladi-green-soft": "#0e4a36",
                                "bladi-yellow": "#ffd95a",
                                "bladi-red": "#e12d39",
                                "bladi-cream": "#f7f4eb",
                        },
                },
        },
        plugins: [],
};
