export interface ITestAction {
    kind: ActionKind;
    payload: Record<string, any>;
}

enum ActionKind {
    create_implicit_account = 'create_implicit_account',
}

export const createImplicitAccountAction = (name: string, balance: number): ITestAction => ({
    kind: ActionKind.create_implicit_account,
    payload: {
        name,
        balance,
    },
});
