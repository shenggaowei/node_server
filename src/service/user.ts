import User from "../model/user";

export const getUser = async () => {
  const users = await User.findAll({
    attributes: ["id", "name"],
  });
  return users;
};
