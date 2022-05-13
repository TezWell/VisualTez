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

The `test suite` block is a root block that aggregates various testing actions sequentially.

<div style={{ display: "flex", justifyContent: "center" }}>
    <video width="80%" loop controls autoPlay muted>
        <source src={require('@site/static/media/guides/create_test_suite.webm').default} type='video/webm' />
    </video>
</div>

## Originate a contract

<center>
    <img
        src={require('@site/static/media/img/testing_originate_block.png').default}
        alt="Originate contract action"
    />
</center>

## Call a contract

<center>
    <img
        src={require('@site/static/media/img/testing_call_contract_block.png').default}
        alt="Call contract action"
    />
</center>

## Create a test wallet

<center>
    <img
        src={require('@site/static/media/img/testing_create_wallet_block.png').default}
        alt="Create a test wallet"
    />
</center>

## Assertions


### Assert the contract storage

<center>
    <img
        src={require('@site/static/media/img/testing_assert_storage_block.png').default}
        alt="Assert the contract storage"
    />
</center>

### Assert the contract balance

<center>
    <img
        src={require('@site/static/media/img/testing_assert_balance_block.png').default}
        alt="Assert the contract balance"
    />
</center>

## Macros (Value expansion)

### Get address of originated contract / wallet

<center>
    <img
        src={require('@site/static/media/img/testing_address_of_block.png').default}
        alt="Get address of originated contract / wallet"
    />
</center>

### Get balance of originated contract / wallet

<center>
    <img
        src={require('@site/static/media/img/testing_balance_of_block.png').default}
        alt="Get balance of originated contract / wallet"
    />
</center>

## Context

### Modify chain identifier

Chain identifier example: `NetXynUjJNZm7wi`

<center>
    <img
        src={require('@site/static/media/img/testing_chain_id_modifier_block.png').default}
        alt="Modify chain identifier"
    />
</center>
