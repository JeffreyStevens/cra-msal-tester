import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {createRoot} from 'react-dom/client';
import {MsalProvider} from '@azure/msal-react';
import {PublicClientApplication} from '@azure/msal-browser';
import {msalConfig} from './authConfig';
import {store} from './store/store';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as Element);

/**
 * Initialize a PublicClientApplication instance which is provided to the MsalProvider component. We recommend
 * initializing this outside of your root component to ensure it is not re-initialized on re-renders.
 */
const msalInstance = new PublicClientApplication(msalConfig);

/**
 * We recommend wrapping most or all of your components in the MsalProvider component. It's best to render the
 * MsalProvider as close to the root as possible.
 */
root.render(
    <ReduxProvider store={store}>
        <React.StrictMode>
            <MsalProvider instance={msalInstance}>
                <App />
            </MsalProvider>
        </React.StrictMode>
    </ReduxProvider>,
);
