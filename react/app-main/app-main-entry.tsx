import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppMain } from './AppMain';

/*
 * Enabling strict mode ensures we won't add deprecated/dangerous react patterns.
 */
ReactDOM.render(
    <React.StrictMode>
        <AppMain />
    </React.StrictMode>,
    document.getElementById('root'),
);
