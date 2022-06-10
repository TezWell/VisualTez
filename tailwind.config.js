module.exports = {
    content: ['./src/**/*.tsx', './src/**/*.ts', './src/**/*.md'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                online: '#16A34A',
                offline: '#DC2626',
            },
            zIndex: {
                60: '60',
                70: '70',
                80: '80',
                90: '90',
                100: '100',
                99999: '99999',
            },
        },
    },
    plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar'), require('@tailwindcss/forms')],
};
