@classDecorator
class Boat {
  @testDecorator
  color: string = "red";
  @testDecorator
  get formattedColor(): string {
    return `This boat's color is ${this.color}`;
  }
  @logError("Ooops, boat was sunk")
  pilot(
    @parameterDecorator speed: string,
    @parameterDecorator direction: boolean
  ): void {
    if (speed === "fast") {
      console.log("swish");
    } else {
      console.log("nothing");
    }
  }
}

function logError(msg: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    console.log("desc:", desc);
    const method = desc.value;
    try {
      method();
    } catch (e) {
      // console.log("Oops, something went wrong", e);
      console.log(msg);
    }
  };
}

function testDecorator(target: any, key: string) {
  console.log(target);
  console.log(key);
}

function parameterDecorator(target: any, key: string, index: number) {
  console.log(key, index);
}

function classDecorator(constructor: typeof Boat) {
  console.log(constructor);
}

new Boat().pilot("fast", true);
