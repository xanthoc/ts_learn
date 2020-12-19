import faker from "faker";
import { Mappable } from "./CustomMap";

class Company implements Mappable {
  companyName: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  };
  color = "yellow";

  constructor() {
    this.companyName = faker.company.companyName();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }

  markerContent(): string {
    return `
    <div>
    <h2>Company Name: ${this.companyName}</h2>
    <h4>Company Catchphrase: ${this.catchPhrase}</h4>
    </div>`;
  }
}

export { Company };
