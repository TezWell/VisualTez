import React from 'react';

interface ConditionalRenderProps<ChildProps> {
    props: ChildProps;
    children: React.FC<Required<ChildProps>>;
}

function ConditionalRender<ChildProps>({ props, children }: ConditionalRenderProps<Partial<ChildProps>>) {
    return Object.values(props).every((v) => v !== undefined && v !== null)
        ? children(props as Required<ChildProps>)
        : null;
}

export default ConditionalRender;
