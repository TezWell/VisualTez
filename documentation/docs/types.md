---
slug: /types
---

# Type blocks

Type blocks define the type of Michelson values. These include the contract `storage` and the signature of contract `entry points` and `on-chain views`.

<center>
    <img
        src={require('@site/static/media/img/types_toolbar_button.png').default}
        alt="Types toolbox button"
    />
</center>

## Singleton types

A singleton type is a simple kind of data type that comprises only one value.

<img
    src={require('@site/static/media/img/types_singleton_blocks.png').default}
    alt="Singleton types"
/>

## Container types

Container types can comprise multiple inner values of one or more data types.

<img
    src={require('@site/static/media/img/types_container_blocks.png').default}
    alt="Container types"
/>

## Artificial types

Artificial types do not exist natively. They are aggregations of native types that comprise custom data structures. An example is `a record`, a data structure composed of nested `Pair` types.

<img
    src={require('@site/static/media/img/types_artificial_blocks.png').default}
    alt="Artificial types"
/>
