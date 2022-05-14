export enum BlockKind {
    // Variable
    variable = 'variable',
    // Types
    string_type = 'string_type',
    unit_type = 'unit_type',
    boolean_type = 'boolean_type',
    address_type = 'address_type',
    nat_type = 'nat_type',
    int_type = 'int_type',
    mutez_type = 'mutez_type',
    timestamp_type = 'timestamp_type',
    chain_id_type = 'chain_id_type',
    bytes_type = 'bytes_type',
    bls12_381_fr_type = 'bls12_381_fr_type',
    bls12_381_g1_type = 'bls12_381_g1_type',
    bls12_381_g2_type = 'bls12_381_g2_type',
    key_type = 'key_type',
    key_hash_type = 'key_hash_type',
    signature_type = 'signature_type',
    operation_type = 'operation_type',
    never_type = 'never_type',
    list_type = 'list_type',
    set_type = 'set_type',
    option_type = 'option_type',
    map_type = 'map_type',
    big_map_type = 'big_map_type',
    pair_type = 'pair_type',
    or_type = 'or_type',
    lambda_type = 'lambda_type',
    ticket_type = 'ticket_type',
    contract_type = 'contract_type',
    sapling_state_type = 'sapling_state_type',
    sapling_transaction_type = 'sapling_transaction_type',
    record_type = 'record_type',
    variant_type = 'variant_type',
    record_variant_field_type = 'record_variant_field_type',
    // Literals
    string_literal = 'string_literal',
    unit_literal = 'unit_literal',
    boolean_literal = 'boolean_literal',
    address_literal = 'address_literal',
    nat_literal = 'nat_literal',
    int_literal = 'int_literal',
    mutez_literal = 'mutez_literal',
    timestamp_literal = 'timestamp_literal',
    chain_id_literal = 'chain_id_literal',
    bytes_literal = 'bytes_literal',
    bls12_381_fr_literal = 'bls12_381_fr_literal',
    bls12_381_g1_literal = 'bls12_381_g1_literal',
    bls12_381_g2_literal = 'bls12_381_g2_literal',
    key_literal = 'key_literal',
    key_hash_literal = 'key_hash_literal',
    signature_literal = 'signature_literal',

    list_literal = 'list_literal',
    set_literal = 'set_literal',
    sequence_item = 'sequence_item',

    map_literal = 'map_literal',
    big_map_literal = 'big_map_literal',
    map_entry = 'map_entry',

    pair_literal = 'pair_literal',
    some_literal = 'some_literal',
    none_literal = 'none_literal',
    none_with_type_literal = 'none_with_type_literal',

    lambda_literal = 'lambda_literal',

    record_literal = 'record_literal',
    record_field = 'record_field',
    variant_value = 'variant_value',
    left_literal_block = 'left_literal_block',
    right_literal_block = 'right_literal_block',

    // Block & Operation Values
    get_amount_block = 'get_amount_block',
    get_balance_block = 'get_balance_block',
    get_chain_id_block = 'get_chain_id_block',
    get_level_block = 'get_level_block',
    get_timestamp_block = 'get_timestamp_block',
    get_current_contract_block = 'get_current_contract_block',
    get_current_contract_address_block = 'get_current_contract_address_block',
    get_sender_block = 'get_sender_block',
    get_source_block = 'get_source_block',
    get_total_voting_power_block = 'get_total_voting_power_block',
    get_voting_power = 'get_voting_power',

    // Expressions
    get_first_pair_element = 'get_first_pair_element',
    get_second_pair_element = 'get_second_pair_element',
    contract_storage_block = 'contract_storage_block',
    compare_block = 'compare_block',
    math_block = 'math_block',
    variables_get = 'variables_get',
    variables_get_v2 = 'variables_get_v2',
    param_access = 'param_access',
    get_map_entries = 'get_map_entries',
    get_map_keys = 'get_map_keys',
    get_map_values = 'get_map_values',
    get_map_value = 'get_map_value',
    map_contains_key = 'map_contains_key',
    prepend_to_list = 'prepend_to_list',
    not = 'not',
    pack = 'pack',
    unpack = 'unpack',
    as_type = 'as_type',
    and = 'and',
    or = 'or',
    xor = 'xor',
    nat_of_int = 'nat_of_int',
    int_of_nat = 'int_of_nat',
    blake2b = 'blake2b',
    sha256 = 'sha256',
    sha512 = 'sha512',
    sha3 = 'sha3',
    keccak = 'keccak',
    hash_key = 'hash_key',
    check_signature = 'check_signature',
    concat = 'concat',
    size_of = 'size_of',
    slice = 'slice',
    call_view = 'call_view',
    call_lambda = 'call_lambda',
    implicit_account = 'implicit_account',
    get_some = 'get_some',
    is_some = 'is_some',
    is_none = 'is_none',
    get_elements_from_set = 'get_elements_from_set',
    get_contract = 'get_contract',
    address_of_contract = 'address_of_contract',
    abs_expression = 'abs_expression',
    negate_expression = 'negate_expression',
    mod_expression = 'mod_expression',
    ediv_expression = 'ediv_expression',
    shift_left_expression = 'shift_left_expression',
    shift_right_expression = 'shift_right_expression',
    set_contains_element_expression = 'set_contains_element_expression',
    is_variant_expression = 'is_variant_expression',
    open_variant_expression = 'open_variant_expression',
    string_starts_with = 'string_starts_with',

    // Statements
    return_statement_block = 'return_statement_block',
    variable_declaration_block = 'variable_declaration_block',
    variable_setter_block = 'variable_setter_block',
    assert_block = 'assert_block',
    if_block = 'if_block',
    for_each_block = 'for_each_block',
    while_block = 'while_block',
    for_block = 'for_block',
    match_variant = 'match_variant',
    match_variant_case = 'match_variant_case',
    transfer_statement = 'transfer_statement',
    call_contract_statement = 'call_contract_statement',
    delegate_statement = 'delegate_statement',
    create_contract_statement = 'create_contract_statement',
    delete_map_entry = 'delete_map_entry',
    add_to_list = 'add_to_list',
    add_element_to_set = 'add_element_to_set',
    remove_element_from_set = 'remove_element_from_set',
    fail_with_statement = 'fail_with_statement',

    // Base
    type_compilation = 'type_compilation',
    value_compilation = 'value_compilation',
    entry_point_block = 'entry_point_block',
    onchain_view = 'onchain_view',
    contract_block = 'contract_block',

    // Testing
    test = 'test',
    test__create_implicit_account_action = 'test__create_implicit_account_action',
    test__originate_contract_action = 'test__originate_contract_action',
    test__originate_contract_from_code_action = 'test__originate_contract_from_code_action',
    test__call_contract_action = 'test__call_contract_action',
    test__assert_account_balance_action = 'test__assert_account_balance_action',
    test__assert_contract_storage_action = 'test__assert_contract_storage_action',
    test__modify_chain_id_action = 'test__modify_chain_id_action',
    test__pack_data_action = 'test__pack_data_action',

    test__address_of_account = 'test__address_of_account',
    test__balance_of_account = 'test__balance_of_account',
}

export default BlockKind;
