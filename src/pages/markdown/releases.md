# Releases


## 1.2.1
|   |   |
|---|---|
| Date | 2022-07-16 |
| Commit  | [9779724](https://github.com/TezWell/VisualTez/commit/977972428115f9024e42629bbe4dd62541654ff1) |

### Change Log

- Adds expressions for adding and substracting seconds, minutes and hours from timestamps;
- Removes jakartanet node;

#### Breaking changes
#### Bug fixes

## v1.2.0
|   |   |
|---|---|
| Date | 2022-06-12 |
| Commit  | [b3ecd55](https://github.com/TezWell/VisualTez/commit/b3ecd55c4cf21ac3be837b832fa78a1f5bcb1472) |

### Change Log

- Adds test actions for modifying the block (timestamp and level);
- Open failed action results by default;
- Split compilation outputs from test outputs;
- Rename the `create wallet` label to `create account` in test suites;
- Adds block expression for computing the median value of a list of integers;
- Adds support for `tickets`;
- Adds the information about the storage type on the deployment page;

#### Breaking changes

#### Bug fixes

- Fixes the format of test results;

## v1.0.3
|   |   |
|---|---|
| Date | 2022-06-08 |
| Commit  | [58ec537](https://github.com/TezWell/VisualTez/commit/58ec5373bf8efd55d43ab62fc371d21d2a79ef95) |

### Change Log

- Restructure toolbox sections;
- Notify the user if the contract compilation is not selected when originating a contract;
- Validates (recipient, sender, and entry point) inputs when calling a contract in a test suite;
- Reduces the size of 'call contract' blocks in test suites;
- Removes variant block from initial storage toolbox in deploy page;

#### Breaking changes

#### Bug fixes

- Fixes breaking change that disabled the search feature in the editor toolbox;
- Clear previous compilations on workspace changes;
- Fixes type input on 'get contract' expression block;
- Removes 'null' and 'undefined' labels when loading the 'variable getter' from XML;

## v1.0.0
|   |   |
|---|---|
| Date | 2022-05-27 |
| Commit  | [1f6523f](https://github.com/TezWell/VisualTez/commit/1f6523f6c88e6334548b6f79cda8e93da78b9fc0) |

### Change Log

- Adds contract examples (FA1.2, Counter);
- Adds testing examples (FA2, Counter);
- Add tooltips to the majority of the blocks;
- Improvements to the editor toolbox structure;
- Replaces default values with shadows on on-view blocks;
- Adds shadow blocks on crypto expressions;
- Documentation improvements.


#### Breaking changes

- Fixes the 'mint' entrypoint in `FA2` contract template.

#### Bug fixes

- Fixes position of testing results modal;
- Increases the timeout when calling the test API;
- Fixes the deletion rollback (Ctrl + z) on testing blocks;
- Removes unexpected function calls when using 'useState';
- Keep selected variables when duplicating blocks;

## v0.7.1
|   |   |
|---|---|
| Date | 2022-05-16 |
| Commit  | [d7e53db](https://github.com/TezWell/VisualTez/commit/d7e53db200a25589f2ba2355fd4efdc52c9558c6) |

### Change Log

- Verify and reveal wallet when originating a contract.
- Update landing page;
- Adds documention for the testing feature;
- Adds helper expressions;

#### Breaking changes

#### Bug fixes

- Unsubscribe previous operation subscription when originating multiple contracts.

## v0.7.0
|   |   |
|---|---|
| Date | 2022-05-11 |
| Commit  | [7d06ae2](https://github.com/TezWell/VisualTez/commit/7d06ae264628c0caa033e37a094812ee2db8966f) |

### Change Log

- Adds a feature for testing smart contracts;
- Improves the zelos rendered by adding connection hints;
- Increases the detection radius for input connections;
- Adds variable scoping on contract compilation blocks;

#### Breaking changes

- The variable getter blocks were merged into a single block.

#### Bug fixes

- Fixes the compilation;
- Fixes the copy button in code snippets;
- Fixes scrolling issues in modals;
