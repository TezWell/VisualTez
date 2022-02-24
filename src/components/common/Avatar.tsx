import React from 'react';

import * as jdenticon from 'jdenticon';

interface OwnProps {
    value: string;
    size?: number;
}

const Avatar: React.FC<OwnProps> = ({ value, size = 32 }) => (
    <div
        dangerouslySetInnerHTML={{ __html: jdenticon.toSvg(value, size).replace('<svg ', '<svg class="block"') }}
        style={{ display: 'flex' }}
    />
);

export default Avatar;
