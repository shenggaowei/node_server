import User from '../model/user'
import User_Login from '../model/user_login'
import Todo_List from '../model/todo_list'

(async function () {
  try {
    await User.sync({alter: true})
    await User_Login.sync({alter: true})
    await Todo_List.sync({alter: true})
  } catch (e) {
    console.log(e);
  } finally {
    process.exit(0);
  }
})();
