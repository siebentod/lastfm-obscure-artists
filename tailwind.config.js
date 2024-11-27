/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: { xs: '360px' },
      colors: {
        light: {
          100: '#fcfaf4',
          200: '#faf6e8',
          300: '#f7f1dd',
          400: '#f5edd1',
          bg: 'hsl(50, 63%, 93%)',
          600: '#c2ba9e',
          700: '#918b77',
          input: 'hsl(50,15%,85%)',
          900: '#302e28',
        },
        dark: {
          100: '#fcfaf4',
          200: '#faf6e8',
          300: '#f7f1dd',
          400: '#f5edd1',
          button: { default: 'hsl(255,40%,20%)', hover: 'hsl(255,30%,25%)' },

          600: '#c2ba9e',
          700: '#918b77',
          input: 'hsl(50,15%,85%)',
          900: '#302e28',
        },
      },
    },
  },
  plugins: [],
};
