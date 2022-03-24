module.exports = {
    content: ['./src/**/*.tsx', './src/**/*.ts', './src/**/*.md'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'editor-dark': '#1e1e1e',
                'editor-light': '#F4F0FD',
                online: '#16A34A',
                offline: '#DC2626',
            },
            zIndex: {
                60: '60',
                70: '70',
                80: '80',
                90: '90',
                100: '100',
            },
        },
    },
    plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar'), require('@tailwindcss/forms')],
};
