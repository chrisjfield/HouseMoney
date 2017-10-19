export interface IUserDetailsObject {
    email: string;
    displayName: string;
}

export interface IUserObject extends IUserDetailsObject {
    userId: string;
}

export interface IUserAuthenticationObject extends IUserObject, IUserResponseObject {
    password: string;
}

export interface IUserResponseObject extends IUserDetailsObject {
    uid: string;
}
