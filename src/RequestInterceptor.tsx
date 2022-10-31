import React, {FC} from 'react';
import {useAccount, useMsal} from '@azure/msal-react';
import axios, {AxiosRequestConfig} from 'axios';
import {getResourceUrl} from './authConfig';
import ConfigData from './config';

export interface RequestInterceptorProps {
    children: JSX.Element;
}

/**
 * Intercepts axios async calls to set the base URL for API calls, add an Authorization bearer token to the headers and
 * requests a user_impersonation scope. Wrap any components that call STS APIs via axios with this interceptor.
 *
 * @param children
 * @constructor
 */
const RequestInterceptor: FC<RequestInterceptorProps> = ({children}: RequestInterceptorProps) => {
    const {instance, accounts} = useMsal();
    const account = useAccount(accounts[0]);
    const stsApiClientId = ConfigData.API_CLIENT_ID_NON_PROD;

    const apiScope = `api://${stsApiClientId}/user_impersonation`;

    axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
        if (!account) {
            throw Error('No active account! Verify a user has been signed in.');
        }

        const response = await instance.acquireTokenSilent({
            account,
            scopes: [apiScope],
        });

        // The resource_url is environment dependent.
        const resource_url = getResourceUrl();

        const axios_config: AxiosRequestConfig = {
            ...config,
            baseURL: resource_url,
            timeout: 600000, // 10 minutes
            headers: {
                ...config.headers,
                Authorization: `Bearer ${response.accessToken}`,
            } as any, // 'Authorization' breaks headers type in latest axios version
        };

        return axios_config;
    });

    return <>{children}</>;
};

export default RequestInterceptor;
