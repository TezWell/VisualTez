import { Block } from 'blockly';
import Blockly from 'blockly';

import { String as M_String } from '@tezwell/michelson-sdk/literal';
import { TString as M_TString } from '@tezwell/michelson-sdk/type';
import { TString as ST_TString } from '@tezwell/smartts-sdk/type';
import { String as ST_String } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildErrorInfo } from '../utils/errorHandling';

const StringBlock = {
    type: BlockKind.string_literal,
    message0: 'String %1',
    args0: [
        {
            type: 'field_input',
            name: 'string_literal',
            text: '',
            check: 'String',
        },
    ],
    output: ['Literal', 'String'],
    colour: 40,
    // style: 'text_blocks',
    // helpUrl: '%{BKY_TEXT_TEXT_HELPURL}',
    // tooltip: '%{BKY_TEXT_TEXT_TOOLTIP}',
    // extensions: ['string_quotes'],
};

Blockly.Blocks[BlockKind.string_literal] = {
    init: function () {
        this.jsonInit(StringBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.string_literal, {
    toType: () => {
        return ST_TString();
    },
    toValue: (block: Block) => {
        return ST_String(block.getFieldValue('string_literal'), buildErrorInfo(block));
    },
});
Michelson.addBlock(BlockKind.string_literal, {
    toType: () => {
        return M_TString();
    },
    toMichelson: (block: Block) => {
        return M_String(block.getFieldValue('string_literal'));
    },
});

/**
 * Blockly Extension
 * @see https://github.com/google/blockly/blob/master/blocks/text.js
 */

// const QUOTE_IMAGE_MIXIN = {
//     /**
//      * Image data URI of an LTR opening double quote (same as RTL closing double
//      * quote).
//      * @readonly
//      */
//     QUOTE_IMAGE_LEFT_DATAURI:
//         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAA' +
//         'n0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY' +
//         '1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1' +
//         'HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMf' +
//         'z9AylsaRRgGzvZAAAAAElFTkSuQmCC',
//     /**
//      * Image data URI of an LTR closing double quote (same as RTL opening double
//      * quote).
//      * @readonly
//      */
//     QUOTE_IMAGE_RIGHT_DATAURI:
//         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAA' +
//         'qUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhg' +
//         'gONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvB' +
//         'O3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5Aos' +
//         'lLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==',
//     /**
//      * Pixel width of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
//      * @readonly
//      */
//     QUOTE_IMAGE_WIDTH: 12,
//     /**
//      * Pixel height of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
//      * @readonly
//      */
//     QUOTE_IMAGE_HEIGHT: 12,

//     /**
//      * Inserts appropriate quote images before and after the named field.
//      * @param {string} fieldName The name of the field to wrap with quotes.
//      * @this {Block}
//      */
//     quoteField_: function (this: any, fieldName: string) {
//         for (let i = 0, input; (input = this.inputList[i]); i++) {
//             for (let j = 0, field; (field = input.fieldRow[j]); j++) {
//                 if (fieldName === field.name) {
//                     input.insertFieldAt(j, this.newQuote_(true));
//                     input.insertFieldAt(j + 2, this.newQuote_(false));
//                     return;
//                 }
//             }
//         }
//         console.warn('field named "' + fieldName + '" not found in ' + this.toDevString());
//     },

//     /**
//      * A helper function that generates a FieldImage of an opening or
//      * closing double quote. The selected quote will be adapted for RTL blocks.
//      * @param {boolean} open If the image should be open quote (“ in LTR).
//      *                       Otherwise, a closing quote is used (” in LTR).
//      * @return {!FieldImage} The new field.
//      * @this {Block}
//      */
//     newQuote_: function (this: any, open: boolean) {
//         const isLeft = this.RTL ? !open : open;
//         const dataUri = isLeft ? this.QUOTE_IMAGE_LEFT_DATAURI : this.QUOTE_IMAGE_RIGHT_DATAURI;
//         return new (FieldImage as any)(
//             dataUri,
//             this.QUOTE_IMAGE_WIDTH,
//             this.QUOTE_IMAGE_HEIGHT,
//             isLeft ? '\u201C' : '\u201D',
//         );
//     },
// };

// Extensions.register('string_quotes', function (this: any) {
//     this.mixin(QUOTE_IMAGE_MIXIN);
//     this.quoteField_('string_literal');
// });
