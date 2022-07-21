import {
  Model,
  InferAttributes,
  InferCreationAttributes
} from "@sequelize/core";


interface DefineModel<T> extends Model<InferAttributes<DefineModel<T>>, InferCreationAttributes<DefineModel<T>>> {
}

export type TModel<T> = DefineModel<T> & {
  [p in keyof T]: T[p]
}
