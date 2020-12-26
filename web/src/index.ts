import { User } from "./models/User";
import { UserForm } from "./views/UserForm";

const user = User.buildUser({ name: "Mark", age: 43 });

const root = document.getElementById("root");
if (root) {
  const userForm = new UserForm(root, user);
  userForm.render();
} else {
  throw new Error("Can't find root element");
}
