import User from "../model/user";

export const getUser = async () => {
  const users = await User.findOne({
    attributes: ["id", "name"],
  });
  return users;
};
