import faker from "faker";
import { Mappable } from "./CustomMap";

class User implements Mappable {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  color = "red";

  constructor() {
    this.name = faker.name.findName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }

  markerContent(): string {
    return `Hi, I'm ${this.name}`;
  }
}

export { User };
