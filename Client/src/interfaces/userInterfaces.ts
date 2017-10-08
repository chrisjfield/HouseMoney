export interface UserObject {
    userId: string;
    email: string;
    displayName: string;
}

export interface UserAuthenticationObject extends UserObject {
    password: string;
}
