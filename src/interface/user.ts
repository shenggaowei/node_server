import { TOrigin } from "./device";

export interface IVerifyAuthInfo {
    token: string
}
export interface IUser {
    userName: string;
    password: string;
    phone?: string
}

export interface IUserParams extends IUser {
    origin: TOrigin
}
