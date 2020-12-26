import { Attributes } from "./Attributes";
import { Collection } from "./Collection";
import { Eventing } from "./Eventing";
import { Model } from "./Model";
import { Sync } from "./Sync";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps) {
    return new User(
      new Attributes<UserProps>(attrs),
      new Sync<UserProps>(rootUrl),
      new Eventing()
    );
  }
  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (attrs: UserProps) =>
      User.buildUser(attrs)
    );
  }
  setRandomAge = (): void => {
    const age = Math.round(Math.random() * 120);
    this.set({ age });
  };
}
