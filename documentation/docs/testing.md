# Testing

The testing feature allows users to test their smart contracts in a real Tezos environment against a given protocol.<br/>
It provides various actions that enable the complete testability of smart contracts.

<center>
    <img
        src={require('@site/static/media/img/testing_toolbar_button.png').default}
        alt="Testing toolbox button"
    />
</center>

## Create a test suite

The `test suite` block is a top-level block that aggregates various testing actions sequentially, allowing the user to validate if the contract is functioning as designed.

<div style={{ display: "flex", justifyContent: "center" }}>
    <video width="80%" loop controls autoPlay muted>
        <source src={require('@site/static/media/guides/create_test_suite.webm').default} type='video/webm' />
    </video>
</div>

## Operation Actions
### Deploy a contract

A `contract origination` creates a new smart contract from a compilation output and specifies its initial amount of tokens and its initial storage.

<div style={{ display: "flex", justifyContent: "center" }}>
    <video width="80%" loop controls autoPlay muted>
        <source src={require('@site/static/media/guides/originate_action.webm').default} type='video/webm' />
    </video>
</div>

### Call a contract

A `contract call` creates a transaction operation, transferring an amount to the recipient contract and executing code if the recipient is an originated contract.

<div style={{ display: "flex", justifyContent: "center" }}>
    <video width="80%" loop controls autoPlay muted>
        <source src={require('@site/static/media/guides/call_contract_action.webm').default} type='video/webm' />
    </video>
</div>

### Create a test wallet

This action creates a `test wallet` that other actions can use
to validate smart contract conditions. An example is having a test wallet serving as administrator and ensuring that only that wallet can do administrative operations.

<div style={{ display: "flex", justifyContent: "center" }}>
    <video width="80%" loop controls autoPlay muted>
        <source src={require('@site/static/media/guides/create_wallet_action.webm').default} type='video/webm' />
    </video>
</div>

## Assertion Actions


### Assert the contract storage

This action compares the actual storage of a contract against an expected value provided by the user. The assertion expects both values to be identical, otherwise fails.

<center>
    <img
        src={require('@site/static/media/img/testing_assert_storage_block.png').default}
        alt="Assert the contract storage"
    />
</center>

### Assert the contract balance

This action compares the actual balance of a contract against an expected amount provided by the user. The assertion expects both values to be equal, otherwise fails.

<div style={{ display: "flex", justifyContent: "center" }}>
    <video width="80%" loop controls autoPlay muted>
        <source src={require('@site/static/media/guides/assert_balance.webm').default} type='video/webm' />
    </video>
</div>


## Context Actions

### Modify chain identifier

Modifies the `chain identifier`. It may be useful when testing signatures against replay attacks.

Chain identifier example: `NetXynUjJNZm7wi`

<center>
    <img
        src={require('@site/static/media/img/testing_chain_id_modifier_block.png').default}
        alt="Modify chain identifier"
    />
</center>

## Macros (Value expansion)

### Get address of originated contract / wallet

This macro expands to an actual Tezos address of a contract or account created in the test suite. The address is known only during the execution of the test suite.

<center>
    <img
        src={require('@site/static/media/img/testing_address_of_block.png').default}
        alt="Get address of originated contract / wallet"
    />
</center>

### Get balance of originated contract / wallet

This macro expands to an actual Tezos amount of a contract or account created in the test suite. The balance is known only during the execution of the test suite.

<div style={{ display: "flex", justifyContent: "center" }}>
    <video width="80%" loop controls autoPlay muted>
        <source src={require('@site/static/media/guides/balance_of.webm').default} type='video/webm' />
    </video>
</div>
