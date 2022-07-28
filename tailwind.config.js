/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-black": "#191B1F",
        "custom-gray": "#1E2129",
        "custom-border": "#1E2129",
        "custom-title": "#C3C4CA",
        "custom-arrow": "#1C55C6",
        "custom-button": "#2072E4",
      },
    },
  },
  plugins: [],
};
