/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
        "*.{js,ts,jsx,tsx,mdx}"
    ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b8541',
          dark: '#2d6431',
          light: '#4fa658',
          lighter: '#e8f3e9',
          50: '#f3f8f4',
          100: '#e8f3e9',
          200: '#d1e7d3',
          300: '#a8d2ac',
          400: '#6fb377',
          500: '#4fa658',
          600: '#3b8541',
          700: '#2d6431',
          800: '#275229',
          900: '#204322',
        },
        secondary: {
          DEFAULT: '#f3c344',
          dark: '#e6a91f',
          light: '#f5d276',
          lighter: '#fef5db',
          50: '#fefcf3',
          100: '#fef5db',
          200: '#fcebb7',
          300: '#f5d276',
          400: '#f3c344',
          500: '#e6a91f',
          600: '#cc8f0d',
          700: '#a6710f',
          800: '#875b13',
          900: '#704a14',
        },
        accent: {
          green: '#3b8541',
          yellow: '#f3c344',
        },
      },
    },
  },
  plugins: [],
}