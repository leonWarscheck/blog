import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ['Open Sans', 'sans-serif'],
      //   serif: ['Open Sans', 'serif'],
      //   mono: ['Open Sans', 'monospace'],
      // },
      fontFamily: {
        // roboto: ['Roboto', 'sans-serif'],
        // lato: ['Lato', 'sans-serif'],
        // inter: ['Inter', 'sans-serif'],
        // nunito: ['Nunito', 'sans-serif'],
        opensans: ['var(--font-opensans)'],
      },
      screens: {
        'c1': '854px',
      },
      spacing: {
        'c1': '102px',
        'c2': '55.5px',
        'c3': '9px',
      },
      fontSize: {
        'xxs': '6.5px',
      'la1': ['26.5px', '31px'],
      },
      colors: {
        orange: {
          'la': '#ff8632',
          // 'la': '#ff6446',
        },
        emerald: {
          'la': '#25ffa8',
        },
        yellow: {
          'la': '#ffe34a'
        },
        blue: {
          'la': '#5a8dff'
        },
        red: {
          'la': '#ff3636'
        },
        violet: {
          'la': '#9372ff'
        }

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
