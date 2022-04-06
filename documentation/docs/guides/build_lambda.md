# Building a lambda

The animation below shows how to build and compile a lambda that expects a value of type `address` as input and returns `True` if the input argument is equal to the transaction sender and `False` otherwise.

<div style={{ display: "flex", justifyContent: "center" }}>
    <video width="80%" loop controls autoPlay muted>
        <source src={require('@site/static/media/guides/build_lambda.webm').default} type='video/webm' />
    </video>
</div>

<br/>

:::info

Lambdas do not have direct access to the contract storage. If a lambda needs to modify the storage, it can be passed as input and returned.

:::
