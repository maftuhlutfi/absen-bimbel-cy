module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Poppins']
    },
    extend: {
      colors: {
        'light-blue': '#EFF9FF',
        'cust-blue': '#51C3FE',
        'cust-orange': '#F9AF2A',
        'icon-light': '#CDE4F1',
        'cust-green': '#55AD68',
        'cust-red': '#D25540'
      },
      textColor: {
        primary: '#262A2D',
        secondary: '#6F787D'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
