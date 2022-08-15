import { TOrigin } from "./device";

export interface IVerifyAuthInfo {
    token: string
}
export interface IAuth {
    userName: string;
    password: string;
    phone?: string
}

export interface IAuthParams extends IAuth {
    origin: TOrigin
}
