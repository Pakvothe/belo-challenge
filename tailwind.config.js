module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': { 'max': '640px' },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': { 'max': '768px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': { 'max': '1024px' },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': { 'max': '1280px' },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': { 'max': '1536px' },
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
