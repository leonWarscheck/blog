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
        sans: ['var(--font-nunito)'],

      },
      fontSize: {
        'xxs': '6.5px',
      'la1': ['26.2px', '32px'],
      },
      colors: {
        orange: {
          'la': '#ff8632',
        },
        emerald: {
          'la': '#25ffa8',
        },
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
