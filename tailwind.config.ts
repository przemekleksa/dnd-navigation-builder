import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#101828',
        },
        secondary: {
          700: '#344054',
        },
        tertiary: {
          600: '#475467',
        },
        button: {
          withIcon: { base: '#7F56D9', hover: '#6947b1' },
          secondary: {
            border: '#D0D5DD',
          },
          cta: {
            border: '#D6BBFB',
            color: '#6941C6',
          },
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
} satisfies Config;
