import React from 'react';
import RequestInterceptor from './RequestInterceptor';
import {AuthenticatedTemplate, UnauthenticatedTemplate} from '@azure/msal-react';
import UnauthComponent from './UnauthComponent';
import AuthComponent from './AuthComponent';

function App() {
    return (
        <>
            <AuthenticatedTemplate>
                <RequestInterceptor>
                    <AuthComponent />
                </RequestInterceptor>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <UnauthComponent />
            </UnauthenticatedTemplate>
        </>
    );
}

export default App;
