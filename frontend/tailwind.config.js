/** @type {import('tailwindcss').Config} */
module.exports = {
  // 兼容小程序：关闭核心 base 重置，改用 uni-app 自带 reset
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 定义儿童习惯养成系统的主品牌色（卡通活泼风格）
        primary: {
          DEFAULT: '#FF8C42', // 活力橙
          light: '#FFB266',
          dark: '#E07330',
        },
        secondary: {
          DEFAULT: '#4ECDC4', // 清新绿
          light: '#7FE5DE',
          dark: '#3EB8B0',
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
};
