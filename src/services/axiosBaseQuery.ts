import {BaseQueryFn} from '@reduxjs/toolkit/dist/query/react';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';

export interface IApiErrorData {
    message: string;
}

// Extend QueryResult with an array of your API instances
export interface IQueryResult {
    count: number;
    pages: number;
    pageSize: number;
    currentPage: number;
}

export interface IAxiosBaseQueryFn {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
}

export const axiosBaseQuery =
    (): BaseQueryFn<IAxiosBaseQueryFn> =>
    async ({url, method, data, params, headers}) => {
        // If a URL path parameter is missing (e.g. '${id}') we will see 'undefined' as part of the url so return error.
        if (url.includes('undefined'))
            return {
                error: {
                    status: 'Error',
                    data: {message: 'Check url path'} as IApiErrorData,
                },
            };
        // Must return {data: data} or {error: data} shape
        try {
            const result = await axios({url, method, data, params, headers});
            return {data: result.data};
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data as IApiErrorData, // || err.message,
                },
            };
        }
    };
