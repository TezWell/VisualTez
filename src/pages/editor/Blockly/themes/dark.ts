import Blockly from 'blockly/core';

Blockly.registry.unregister('theme', 'dark');

const DarkTheme = Blockly.Theme.defineTheme('dark', {
    base: Blockly.Themes.Classic,
    categoryStyles: {
        class_category: {
            colour: '#fcba03',
        },
        literal_category: {
            colour: '#CDB6E9',
        },
        blockchain_category: {
            colour: '#C5EAFF',
        },
        variables_category: {
            colour: '#ccc',
        },
        assertion_category: {
            colour: '#252526',
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
