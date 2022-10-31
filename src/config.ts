import {IRole} from './types';

export const ConfigData = {
    APP_NAME: 'Tester',
    APP_VERSION: '0.1.0',

    AUTHORITY: 'https://login.microsoftonline.com/a25fff9c-3f63-4fb2-9a8a-d9bdd0321f9a',

    ROLES: [
        {priority: 1, claim: 'admin', displayValue: 'Admin'},
        {priority: 2, claim: 'general', displayValue: 'General'},
    ] as IRole[],

    UI_CLIENT_ID_NON_PROD: '12345678-2222-3333-4444-123456789012',
    API_CLIENT_ID_NON_PROD: '87654321-5555-6666-7777-210987654321',

    LOCALHOST: 'localhost',

    UI_LOCALHOST: 'localhost',
    UI_LOCALHOST_PORT: '3000',
    UI_LOCALHOST_API_HOST: 'localhost',
};

export default ConfigData;
