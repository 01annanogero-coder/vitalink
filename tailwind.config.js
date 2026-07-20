/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1B4332',
          50: '#e8f5ee',
          100: '#D8F3DC',
          600: '#2D6A4F',
          700: '#1B4332',
          900: '#081C15',
        },
        leaf: {
          DEFAULT: '#52B788',
          light: '#74C69D',
          dark: '#40916C',
        },
        mint: '#D8F3DC',
        cream: '#F8F4EF',
        gold: '#D4A373',
        navy: '#2D3142',
        muted: '#6B7280',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12)',
        nav: '0 1px 3px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
