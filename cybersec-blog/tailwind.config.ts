import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0a0f',
          surface: '#0f0f1a',
          border: '#1a1a2e',
          text: '#e0e0e0',
          muted: '#6b7280',
          accent: '#00ff88',
          alert: '#ff0040',
          warning: '#ffaa00',
          info: '#00aaff',
        },
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'Fira Code', 'monospace'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'typing': 'typing 3.5s steps(40, end) forwards',
        'blink': 'blink 1s step-end infinite',
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
      keyframes: {
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'pulse-green': {
          '0%, 100%': { boxShadow: '0 0 5px #00ff88' },
          '50%': { boxShadow: '0 0 20px #00ff88, 0 0 40px #00ff8840' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e0e0e0',
            maxWidth: '72ch',
            a: { color: '#00ff88', '&:hover': { color: '#00cc6a' } },
            h1: { color: '#ffffff', fontFamily: 'var(--font-jetbrains), monospace' },
            h2: { color: '#00ff88', fontFamily: 'var(--font-jetbrains), monospace' },
            h3: { color: '#e0e0e0', fontFamily: 'var(--font-jetbrains), monospace' },
            strong: { color: '#ffffff' },
            code: { color: '#00ff88', background: '#0f0f1a', padding: '2px 6px', borderRadius: '4px' },
            pre: { background: '#0f0f1a', border: '1px solid #1a1a2e' },
            blockquote: { borderLeftColor: '#00ff88', color: '#9ca3af' },
            hr: { borderColor: '#1a1a2e' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
