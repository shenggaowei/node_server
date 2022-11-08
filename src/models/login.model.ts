import { Table, Default, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import User from '@/models/user.model';
import { TOrigin } from '@/interface/device';

export interface ILoginModel {
    token: string
    status: 1 | 2 | 3
    origin: TOrigin
    userId: number
}

@Table
export class Login extends Model<ILoginModel> {

    @Column
    token: string;

    @Default(1)
    @Column
    status: number;

    @Column
    origin: string;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User
}

export default Login;