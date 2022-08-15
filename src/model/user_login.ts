import { CreateOptions, DataTypes } from '@sequelize/core'
import type { TModel } from '@/interface/model.define'
import sequelize from '@/config/db'

interface IUserLogin {
  user_id: string;
  token: string;
  id: CreateOptions<number>
}

const User_Login = sequelize.define<TModel<IUserLogin>>(
  "user_login",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    token: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    origin: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'user_login',
  }
)

export default User_Login