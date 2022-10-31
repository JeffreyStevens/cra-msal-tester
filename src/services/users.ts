import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {axiosBaseQuery, IQueryResult} from './axiosBaseQuery';
import {IUser} from '../types';

export interface IUserQueryResult extends IQueryResult {
    dataList: IUser[];
}

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['users'],
    endpoints: (build) => ({
        getUsers: build.query<IUserQueryResult, void>({
            query: () => ({url: '/users/', method: 'get'}),
            providesTags: (result) =>
                result
                    ? [...result.dataList.map(({id}) => ({type: 'users', id} as const)), {type: 'users', id: 'LIST'}]
                    : [{type: 'users', id: 'LIST'}],
        }),
    }),
});

export const {useGetUsersQuery} = usersApi;
