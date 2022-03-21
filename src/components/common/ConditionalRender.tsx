import React from 'react';

interface ConditionalRenderProps<ChildProps> {
    props: ChildProps;
    children: React.FC<Required<ChildProps>>;
    fallback?: React.ReactElement<any, any> | null;
}

function ConditionalRender<ChildProps>({
    props,
    children,
    fallback = null,
}: ConditionalRenderProps<Partial<ChildProps>>) {
    return Object.values(props).every((v) => v !== undefined && v !== null)
        ? children(props as Required<ChildProps>)
        : fallback;
}

export default ConditionalRender;
