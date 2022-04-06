import { Contract, CreateContract, EntryPoint, Mutez, None, TUnknown, Unit } from '@tezwell/smartts-sdk';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import Blockly, { Block } from 'blockly';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';
import Context, { ScopeKind } from 'src/blocks/core/context';

Blockly.Blocks[BlockKind.create_contract_statement] = {
    init: function () {
        this.appendDummyInput().appendField('Originate contract with');
        this.appendDummyInput().appendField('Storage Type').setAlign(Blockly.ALIGN_LEFT);
        this.appendValueInput('TYPE').setCheck(['Type']).setAlign(Blockly.ALIGN_LEFT);
        this.appendDummyInput().appendField('Initial Storage').setAlign(Blockly.ALIGN_LEFT);
        this.appendValueInput('STORAGE').setCheck(['Literal', 'Expression']).setAlign(Blockly.ALIGN_LEFT);
        this.appendDummyInput().appendField('Initial Balance').setAlign(Blockly.ALIGN_LEFT);
        this.appendValueInput('BALANCE').setCheck(['Literal', 'Expression']).setAlign(Blockly.ALIGN_LEFT);
        this.appendDummyInput().appendField('Delegate').setAlign(Blockly.ALIGN_LEFT);
        this.appendValueInput('DELEGATE').setCheck(['Literal', 'Expression']).setAlign(Blockly.ALIGN_LEFT);
        this.appendDummyInput().appendField('Entry points').setAlign(Blockly.ALIGN_LEFT);
        this.appendStatementInput('ENTRY_POINTS').setCheck(['Entrypoint']).setAlign(Blockly.ALIGN_LEFT);
        this.setTooltip('A block that originates a contract from within another contract.');
        this.setColour(220);
        this.setPreviousStatement(true, ['Statement']);
        this.setNextStatement(true, ['Statement']);
    },
};

SmartML.addBlock(BlockKind.create_contract_statement, {
    toStatement: (block: Block) => {
        const storage: IExpression<any> = SmartML.toValue(block, 'STORAGE', Unit());
        const balance: IExpression<any> = SmartML.toValue(block, 'BALANCE', Mutez(0));
        const delegate: IExpression<any> = SmartML.toValue(block, 'DELEGATE', None());
        const storageType = SmartML.toType(block, 'TYPE', TUnknown());

        // Update current scope to (Contract)
        Context.main.enterScope({
            kind: ScopeKind.Contract,
        });

        const contract = new Contract(buildErrorInfo(block)).setStorageType(storageType);

        SmartML.toStatements(block, 'ENTRY_POINTS', true).forEach((st) => contract.addEntrypoint(st as EntryPoint));

        // Remove current scope
        Context.main.exitScope();

        const line = buildErrorInfo(block);

        return CreateContract(contract, storage, balance, delegate, line).send(line);
    },
});
