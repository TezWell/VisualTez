import Blockly from 'blockly';
import Variable from '../enums/Variable';

export const createVariable = (name: string, id: string, type = '') => {
    Blockly.getMainWorkspace().createVariable(name, type, id);
};
export const deleteVariableById = (id: string) => {
    Blockly.getMainWorkspace().deleteVariableById(id);
};

export const initiateDefaultVariables = () => {
    createVariable('Contract Storage', Variable.contract_storage, '');
    createVariable('Entrypoint Argument', Variable.entrypoint_arg, '');
};
