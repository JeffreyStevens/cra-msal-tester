import React, {FC, useEffect, useState} from 'react';
import {useGetUsersQuery} from './services/users';

export const AuthComponent: FC = () => {
    const {data: users, isError} = useGetUsersQuery();
    const [apiStatus, setApiStatus] = useState('Pending...');

    useEffect(() => {
        if (users?.dataList && users.dataList.length > 0) setApiStatus('Success');
    }, [users?.dataList]);

    useEffect(() => {
        if (isError) setApiStatus('Error');
    }, [isError]);

    return (
        <>
            <h1>Authenticated Component</h1>
            <p>API Status: {apiStatus}</p>
        </>
    );
};

export default AuthComponent;
