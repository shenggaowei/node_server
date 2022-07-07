import { TOrigin } from "./device";

export interface IAuth {
    userName: string;
    password: string;
    phone?: string
}

export interface IAuthParams extends IAuth {
    origin: TOrigin
}
