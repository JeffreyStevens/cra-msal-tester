import {BrowserAuthOptions, BrowserCacheLocation, Configuration, ILoggerCallback, LogLevel} from '@azure/msal-browser';
import ConfigData from './config';

export const getResourceUrl = (): string => `https://${ConfigData.UI_LOCALHOST_API_HOST}.mayo.edu/api/`;

const getAuth = (): BrowserAuthOptions => ({
    clientId: ConfigData.UI_CLIENT_ID_NON_PROD,
    authority: ConfigData.AUTHORITY,
    redirectUri: `http://${ConfigData.UI_LOCALHOST}:3000/`,
});

export const getLoggerCallback = (): ILoggerCallback => () => {};

export const msalConfig: Configuration = {
    auth: getAuth(), // Object with 'clientId', 'authority' and 'redirectUri' properties
    cache: {
        cacheLocation: BrowserCacheLocation.SessionStorage, // SessionStorage deletes tokens when tab is closed
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            logLevel: LogLevel.Error,
            piiLoggingEnabled: false,
            loggerCallback: getLoggerCallback(),
        },
    },
    telemetry: {
        application: {
            appName: ConfigData.APP_NAME,
            appVersion: ConfigData.APP_VERSION,
        },
    },
};
