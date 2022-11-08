import User from '@/models/user.model'
import Todo from '@/models/todo.model'

(async function () {
  try {
    await User.sync({ force: true })
    await Todo.sync({ force: true })
  } catch (e) {
    console.log(e);
  } finally {
    process.exit(0);
  }
})();
