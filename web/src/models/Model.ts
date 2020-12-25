import { AxiosPromise, AxiosResponse } from "axios";

interface Attributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

type Callback = () => void;
interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: Attributes<T>,
    private sync: Sync<T>,
    private events: Events
  ) {}
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  get get() {
    return this.attributes.get;
  }
  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }
  fetch(): void {
    const id = this.attributes.get("id");
    if (!id) {
      throw new Error("Can't fetch without id");
    }
    this.sync.fetch(id).then((response: AxiosResponse<T>) => {
      this.set(response.data);
    });
  }
  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse) => {
        // this.events.trigger("save");
        this.set(response.data);
      })
      .catch(() => {
        this.events.trigger("error");
      });
  }
}
