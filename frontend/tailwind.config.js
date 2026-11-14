/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FBFBF8',
        surface: '#FFFFFF',
        tinted: '#F3F6F1',
        mint: '#E8F5EE',
        'mint-dark': '#D1FAE5',
        forest: '#0A3622',
        'forest-card': '#11472E',
        emerald: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        amber: {
          DEFAULT: '#F59E0B',
          soft: '#FEF3C7',
        },
        coral: {
          DEFAULT: '#E11D48',
          soft: '#FFE4E6',
          dark: '#9F1239',
        },
        ink: {
          DEFAULT: '#13221B',
          secondary: '#475950',
          muted: '#6C7D74',
        },
        borderLight: '#DCE5DF',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        sketch: '2.5px 2.5px 0px #13221B',
        'sketch-sm': '1.5px 1.5px 0px #13221B',
        'sketch-lg': '4px 4px 0px #13221B',
        'sketch-forest': '2.5px 2.5px 0px #0A3622',
      },
    },
  },
  plugins: [],
}

