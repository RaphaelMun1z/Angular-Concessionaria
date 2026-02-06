/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: '#F8FAFC',
        secondary: '#FFFFFF',
        dark: '#0F172A',
        textGray: '#64748B',
        accent: '#2563EB',
        accentHover: '#1D4ED8',
        gold: '#D97706',
      },
      backgroundImage: {
        'hero-pattern':
          "linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(248, 250, 252, 1)), url('https://images.unsplash.com/photo-1560250056-07ba64664864?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        'cta-pattern':
          "linear-gradient(to right, rgba(37, 99, 235, 0.9), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(0,0,0,0.08)',
        glow: '0 0 20px rgba(37, 99, 235, 0.3)',
      },
    },
  },
  plugins: [],
};
