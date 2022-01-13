export enum BlockKind {
    // Variable
    variable = 'variable',
    // Types
    string_type = 'string_type',
    unit_type = 'unit_type',
    // Literals
    unit_literal = 'unit_literal',
    number_literal = 'number_literal',
    string_literal = 'string_literal',
    some_literal = 'some_literal',
    none_literal = 'none_literal',
    nat_literal = 'nat_literal',
    int_literal = 'int_literal',
    boolean_literal = 'boolean_literal',
    address_literal = 'address_literal',
    // Expressions
    get_contract_storage = 'get_contract_storage',
    get_variable_block = 'get_variable_block',
    compare_block = 'compare_block',
    get_level_block = 'get_level_block',
    get_sender_block = 'get_sender_block',
    // Statements
    set_variable_block = 'variables_set',
    assert_block = 'assert_block',
    //
    entry_point_block = 'entry_point_block',
    contract_block = 'contract_block',
}

export default BlockKind;
