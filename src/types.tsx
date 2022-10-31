export interface IRole {
    priority: number;
    claim: string;
    displayValue: string;
}

export enum UserPreferenceType {
    General = 1,
}

export interface IUserPreferences {
    id: number;
    appUserId?: number;
    appUser?: string;
    preferenceType: UserPreferenceType;
    name: string;
    value: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    firstName: string;
    lastName: string;
    samAccountName: string;
    createdDate: string;
    preferences: IUserPreferences[];
}
