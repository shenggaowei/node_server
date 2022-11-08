import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import User from '@/models/user.model'

export interface ITodoModel {
    content: string
    userId: number
}

@Table
export class Todo extends Model<ITodoModel> {
    @Column
    content: string

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User
}

export default Todo;