import { TOrigin } from "./device";

export interface IUser {
    userName: string;
    password: string;
    phone?: string
}

export interface ILoginParams extends IUser {
    origin: TOrigin
}