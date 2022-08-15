import Auth from '@/model/auth'
import User_Login from '@/model/user_login'
import Todo from '@/model/todo'

(async function () {
  try {
    await Auth.sync({ alter: true })
    await User_Login.sync({ alter: true })
    await Todo.sync({ force: true })
  } catch (e) {
    console.log(e);
  } finally {
    process.exit(0);
  }
})();
