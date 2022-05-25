# Toplevel blocks

The top-level blocks are container components responsible for compiling smart contracts, values, and types to Michelson and SmartPy.

<center>
    <img
        src={require('@site/static/media/img/toplevel_toolbar_button.png').default}
        alt="Toplevel toolbox button"
    />
</center>

## Contract compilation

The `contract compilation` block contains the contract specification, comprising the following components:

- `storage type`
- `initial storage`
- `entry points`
- `on-chain views`

<center>
    <img
        src={require('@site/static/media/img/toplevel_contract_compilation.png').default}
        alt="Contract compilation"
    />
</center>

### Contract Entrypoint

Entry points are similar to public methods of a class in Java. In this case, entry points are methods that can be called in a Tezos transaction. They accept an argument, can modify the contract storage, and can also emit operations (like calling other contracts, delegating staking power, and originating new contracts).

<center>
    <img
        src={require('@site/static/media/img/toplevel_entrypoint_block.png').default}
        alt="Contract entrypoint"
    />
</center>

## Value compilation

The `value compilation` blocks compile [Value Blocks](#value_blocks) to their Michelson reprensentations.

<center>
    <img
        src={require('@site/static/media/img/toplevel_value_compilation.png').default}
        alt="Value compilation"
    />
</center>

## Type compilation

The `type compilation` blocks compile [Type Blocks](#type_blocks) to their Michelson reprensentations.

<center>
    <img
        src={require('@site/static/media/img/toplevel_type_compilation.png').default}
        alt="Type compilation"
    />
</center>
