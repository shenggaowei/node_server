import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import Todo from '@/models/todo.model'
import Login from '@/models/login.model'

export interface IUserModel {
    name: string
    salt: string
    hash: string
}

@Table
export class User extends Model<IUserModel> {

    @Column
    name: string;

    @Column
    salt: string;

    @Column
    hash: string;

    @HasMany(() => Todo)
    todos: Todo[];

    @HasMany(() => Login)
    logins: Login[];
}

export default User;