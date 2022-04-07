import Blockly from 'blockly/core';

// Blockly.registry.unregister('theme', 'dark');

const DarkTheme = Blockly.Theme.defineTheme('dark', {
    base: Blockly.Themes.Classic,
    categoryStyles: {
        class_category: {
            colour: '#fcba03',
        },
        type_category: {
            colour: '#5b67a5',
        },
        expr_stmt_category: {
            colour: '#527772',
        },

        literal_category: {
            colour: '#a58c5b',
        },
        advanced_category: {
            colour: '#5b80a5',
        },
        view_category: {
            colour: '#5ba58c',
        },

        blockchain_category: {
            colour: '#a55c5b',
        },
        cryptography_category: {
            colour: '#a55b74',
        },
        transaction_properties_category: {
            colour: '#6aa84f',
        },

        variables_category: {
            colour: '#99a55b',
        },
        loop_statements_category: {
            colour: '#81d8d0',
        },
        operation_statements_category: {
            colour: '#5b74a5',
        },

        testing_category: {
            colour: '#00C34F',
        },
    },
    blockStyles: {
        list_blocks: {
            colourPrimary: '#4a148c',
            colourSecondary: '#AD7BE9',
            colourTertiary: '#CDB6E9',
        },
        logic_blocks: {
            colourPrimary: '#8b4513',
            colourSecondary: '#ff0000',
            colourTertiary: '#C5EAFF',
        },
        loop_blocks: {
            colourPrimary: '#85E21F',
            colourSecondary: '#ff0000',
            colourTertiary: '#C5EAFF',
        },
        text_blocks: {
            colourPrimary: '#FE9B13',
            colourSecondary: '#ff0000',
            colourTertiary: '#C5EAFF',
        },
    },
    componentStyles: {
        workspaceBackgroundColour: '#1e1e1e',
        toolboxBackgroundColour: 'blackBackground',
        toolboxForegroundColour: '#fff',
        flyoutBackgroundColour: '#252526',
        flyoutForegroundColour: '#ccc',
        flyoutOpacity: 1,
        scrollbarColour: '#797979',
        insertionMarkerColour: '#fff',
        insertionMarkerOpacity: 0.3,
        scrollbarOpacity: 0.4,
        cursorColour: '#d0d0d0',
        blackBackground: '#333',
    },
});

export default DarkTheme;
