/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // "./node_modules/flowbite/**/*.js",
    "./src/**/*.{html,js}",
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        
      },
    },
  },
  plugins: [],
};
