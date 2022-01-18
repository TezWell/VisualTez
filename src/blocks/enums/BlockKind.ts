export enum BlockKind {
    // Variable
    variable = 'variable',
    // Types
    string_type = 'string_type',
    unit_type = 'unit_type',
    boolean_type = 'boolean_type',
    address_type = 'address_type',
    option_type = 'option_type',
    nat_type = 'nat_type',
    int_type = 'int_type',
    // Literals
    record_literal = 'record_literal',
    unit_literal = 'unit_literal',
    number_literal = 'number_literal',
    string_literal = 'string_literal',
    some_literal = 'some_literal',
    none_literal = 'none_literal',
    nat_literal = 'nat_literal',
    int_literal = 'int_literal',
    boolean_literal = 'boolean_literal',
    address_literal = 'address_literal',
    record_field = 'record_field',
    // Expressions
    get_contract_storage = 'get_contract_storage',
    get_variable_block = 'get_variable_block',
    compare_block = 'compare_block',
    math_block = 'math_block',
    get_level_block = 'get_level_block',
    get_sender_block = 'get_sender_block',
    variables_get = 'variables_get',
    param_access = 'param_access',
    // Statements
    set_variable_block = 'variables_set',
    assert_block = 'assert_block',
    //
    entry_point_block = 'entry_point_block',
    contract_block = 'contract_block',
}

export default BlockKind;
