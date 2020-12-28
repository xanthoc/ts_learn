// import { User } from "./models/User";
// import { UserEdit } from "./views/UserEdit";

import { Collection } from "./models/Collection";
import { User, UserProps } from "./models/User";
import { UserList } from "./views/UserList";

// const user = User.buildUser({ name: "Mark", age: 43 });

// const root = document.getElementById("root");
// if (root) {
//   const userEdit = new UserEdit(root, user);
//   userEdit.render();
//   console.log(userEdit);
// } else {
//   throw new Error("Can't find root element");
// }

const collection = User.buildUserCollection();
const root = document.getElementById("root");
if (root) {
  const userList = new UserList(root, collection);
  collection.fetch();
} else {
  throw new Error("Can't find root element");
}
