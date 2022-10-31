import {usersApi} from '../services/users';

export const allReducers = {
    usersApi: usersApi.reducer,
};

export const allMiddleware = [usersApi.middleware];
