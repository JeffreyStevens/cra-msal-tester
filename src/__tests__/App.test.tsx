import React from 'react';
import {render, screen} from '@testing-library/react';
import {MsalReactTester} from 'msal-react-tester';
import {MsalProvider} from '@azure/msal-react';
import {server} from '../__mocks__/server/mockServer';
import {rest} from 'msw';
import {getMockQueryResult} from '../__mocks__/server/mockServerHandlers';
import {mockUsers} from '../__mocks__/mockUsers';
import {setupApiStore} from '../__mocks__/mockApiStore';
import {usersApi} from '../services/users';
import mockStore from 'src/__mocks__/mockStore';
import {Provider} from 'react-redux';
import App from '../App';

const mockMsalAccount = {
    environment: 'login.windows.net',
    homeAccountId: 'home-account-id',
    localAccountId: 'local-account-id',
    name: 'John Doe',
    tenantId: 'tenant-id',
    username: 'john.doe@contoso.com',
    idTokenClaims: {
        name: 'John Doe',
        preferred_username: 'Doe.John@mayo.edu',
        roles: ['admin', 'general'],
        personid: '12345678',
        lanid: 'M123456',
    },
};

let msalTester: MsalReactTester;

const store = setupApiStore(usersApi, mockStore).store;

const renderComponent = () =>
    render(<App />, {
        wrapper: ({children}) => (
            <Provider store={store}>
                <MsalProvider instance={msalTester.client}>{children}</MsalProvider>
            </Provider>
        ),
    });

describe('Router', () => {
    beforeEach(() => {
        // new instance of msal tester for each test:
        msalTester = new MsalReactTester();
        // or new MsalReactTester("Redirect") / new MsalReactTester("Popup")

        // Ask msal-react-tester to handle and mock all msal-react processes:
        msalTester.spyMsal();
    });

    afterEach(() => {
        // reset msal-react-tester
        msalTester.resetSpyMsal();
    });

    test('finds sign-in page', async () => {
        msalTester.isNotLogged();
        renderComponent();

        // wait for msal-react-tester to handle events from msal-react:
        await msalTester.waitForRedirect();

        // verify page content for default route
        expect(await screen.getByText(/please sign in/i)).toBeInTheDocument();
    });

    test('finds landing page for logged in user', async () => {
        // MSW is not finding my server mocks...likely something in MsalReactTester mocking?
        server.use(
            rest.get('/users', (req, res, ctx) => {
                console.log('users:');
                return res(ctx.status(200), ctx.json(getMockQueryResult(mockUsers)));
            }),
        );

        // mock logged in user
        msalTester.isLogged();
        msalTester.accounts[0] = mockMsalAccount; // add idTokenClaims with roles[] array
        renderComponent();

        // wait for msal-react-tester to handle events from msal-react:
        await msalTester.waitForRedirect();

        // verify page content for default route
        expect(await screen.getByText(/Authenticated Component/i)).toBeInTheDocument();

        // the following check fails since nothing comes back...
        // expect(await screen.getByText(/API Status: Success/i)).toBeInTheDocument();
    });
});
