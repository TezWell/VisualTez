---
slug: /
---

# Building a contract

<div style={{ display: "flex", justifyContent: "center" }}>
    <video width="80%" loop controls autoplay muted>
        <source src={require('@site/static/media/guides/build_contract.webm').default} type='video/webm' />
    </video>
</div>

## Selecting a compilation block

To build a smart contract, the user needs to select a contract compilation block.

The animation below shows how to do it.

<div style={{ display: "flex", justifyContent: "center" }}>
    <video width="70%" loop controls muted={true} autoplay={true}>
        <source src={require('@site/static/media/guides/contract_compilation_block.webm').default} type='video/webm' />
    </video>
</div>

## Specifying the storage type

The animation below sets the contract storage to be of type `string`.

<div style={{ display: "flex", justifyContent: "center" }}>
    <video width="70%" loop controls muted={true} autoplay={true}>
        <source src={require('@site/static/media/guides/specify_storage_type.webm').default} type='video/webm' />
    </video>
</div>

## Specifying the initial storage
The initial storage is optional. It is unnecessary when the user only wants to compile the smart contract.

The initial storage value will be propagated to the deployment page if the user wants to deploy the contract directly from VisualTez.

<div style={{ display: "flex", justifyContent: "center" }}>
    <video width="70%" loop controls muted={true} autoplay={true}>
        <source src={require('@site/static/media/guides/specify_storage.webm').default} type='video/webm' />
    </video>
</div>

## Specifying an entrypoint

The animation below shows how to define an entry point that expects a `string` as an input argument and replaces the current value in the contract storage.

<div style={{ display: "flex", justifyContent: "center" }}>
    <video width="70%" loop controls muted={true} autoplay={true}>
        <source src={require('@site/static/media/guides/specify_entrypoint.webm').default} type='video/webm' />
    </video>
</div>

## Specifying an on-chain view

The example below shows how to define an on-chain view that expects an argument of type `unit` and returns the current contract storage.

<div style={{ display: "flex", justifyContent: "center" }}>
    <video width="70%" loop controls muted={true} autoplay={true}>
        <source src={require('@site/static/media/guides/specify_view.webm').default} type='video/webm' />
    </video>
</div>
