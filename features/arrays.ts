const carMakers = ["ford", "toyota"];

const a: number[] = [];

// a.push("a");
a.push(1);

console.log(a);

carMakers.map((a): string => {
  return a.toUpperCase();
});

class Vehicle {
  constructor(public color: string) {}
  public drive(): void {
    console.log("vroom");
  }
}

const aV = new Vehicle("blue");
aV.drive();
console.log(aV.color);

class Car extends Vehicle {}

const car = new Car("white");
console.log(car.color);
