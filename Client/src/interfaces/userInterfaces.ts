export interface IUserDetailsObject {
    email: string;
    displayName: string;
}

export interface IUserObject extends IUserDetailsObject {
    userId: string;
}

export interface IUserAuthenticationObject extends IUserObject {
    password: string;
}

export interface IUserResponseObject extends IUserDetailsObject {
    uid: string;
}
