import React from 'react';

import Theme from '../Theme';

const useTheme = () => {
    const context = React.useContext(Theme.Context);
    if (context == null) {
        throw new Error('`theme context` is not available.');
    }
    return context;
};

export default useTheme;
