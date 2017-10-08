export interface IUserDetailsObject {
    email: string;
    displayName: string;
}

export interface IUserObject extends UserDetailsObject {
    userId: string;
}

export interface IUserAuthenticationObject extends UserObject {
    password: string;
}

export interface IUserResponseObject extends UserDetailsObject {
    uid: string;
}
