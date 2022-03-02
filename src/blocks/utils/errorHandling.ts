import type { Block } from 'blockly';
import { LineInfo } from '@tezwell/smartts-sdk/misc/utils';

export const buildErrorInfo = (block: Block) => new LineInfo(block.id, '');
