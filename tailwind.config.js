/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';
import typography from '@tailwindcss/typography';

const config = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // deep blue accent
        secondary: '#D97706', // warm ochre accent
        background: '#FAFAFA', // soft neutral background
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [lineClamp, typography],
};

export default config;
