type Callback = () => void;

export class Eventing {
  events: { [key: string]: Callback[] } = {};
  on = (eventName: string, callback: Callback): void => {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  };
  trigger = (eventName: string): void => {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback();
      });
    }
  };
}
