import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

export class Collection<T, K> {
  models: T[] = [];
  events = new Eventing();
  constructor(public rootUrl: string, public deserialize: (attrs: K) => T) {}
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  fetch(): void {
    axios.get(this.rootUrl).then((res: AxiosResponse<K[]>) => {
      res.data.forEach((element) => {
        this.models.push(this.deserialize(element));
      });
      this.events.trigger("fetch");
    });
  }
}
