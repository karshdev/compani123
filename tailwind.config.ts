import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
      '5xl': '3840px', // 4K
      '6xl': '5120px', // 5K
    },
    extend: {
      colors: {
        'primary-purple': 'var(--unnamed-color-705aaa)',
        'light-purple': 'var(--unnamed-color-cbc8d4)',
        'active-bg-2': 'var(--activestate_bg_2)',
        'active-bg-1': 'var(--activestate_bg_1)',
        'primary-green': 'var(--unnamed-color-0bd984)',
        'dark-blue': 'var(--unnamed-color-072635)',
        'blue-1': 'var(--unnamed-color-0c3d5d)',
        'blue-2': 'var(--unnamed-color-084c77)',
        'blue-3': 'var(--unnamed-color-055a92)',
        'blue-4': 'var(--unnamed-color-006aac)',
        'blue-5': 'var(--unnamed-color-007bc7)',
        'gray-1': 'var(--unnamed-color-707070)',
        'gray-2': 'var(--unnamed-color-f6f6f6)',
        'gray-3': 'var(--unnamed-color-ededed)',
        'black': 'var(--unnamed-color-000000)',
        'gray-4': 'var(--unnamed-color-878787)',
        'white': 'var(--unnamed-color-ffffff)',
        'orange': 'var(--unnamed-color-ff6200)',
        'chart-bg': 'var(--chart-background)',
        'systolic': 'var(--systolic-color)',
        'diastolic': 'var(--diastolic-color)',
      },
      fontFamily: {
        manrope: ['var(--font-manrope)', 'sans-serif'],
      },
      fontSize: {
        '14': '14px',
        '18': '18px',
        '24': '24px',
      },
      lineHeight: {
        '19': '19px',
        '24': '24px',
        '33': '33px',
      },
    },
  },
  plugins: [],
}
export default config

