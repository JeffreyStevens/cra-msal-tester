import {IRole, IUser} from '../types';
import {map, prop, sortBy} from 'ramda';
import ConfigData from '../config';

//------------------------------------------------------------------------------
// User Profile
//------------------------------------------------------------------------------
export const mockRoles: IRole[] = sortBy(prop('priority'), ConfigData.ROLES);

export const mockAccount = {
    homeAccountId: 'b3253a60-8e96-4aa1-bf49-ea8a0b662b98.a25fff9c-3f63-4fb2-9a8a-d9bdd0321f9a',
    environment: 'login.windows.net',
    tenantId: 'a25fff9c-3f63-4fb2-9a8a-d9bdd0321f9a',
    username: 'Doe.John@mayo.edu',
    localAccountId: '123456789-2222-3333-4444-5555555555',
    name: 'Doe, John',
    idTokenClaims: {
        name: 'Doe, John',
        preferred_username: 'Doe.John@mayo.edu',
        roles: map((r) => r.claim, mockRoles),
        personid: '12345678',
        lanid: 'm123456',
    },
};

export const mockUsers: IUser[] = [
    {
        id: 1,
        name: 'Doe, John',
        email: 'Doe.John@mayo.edu',
        firstName: 'John',
        lastName: 'Doe',
        samAccountName: 'm123456',
        createdDate: '2022-05-14T09:30:45.0000000Z',
        preferences: [],
    },
];
