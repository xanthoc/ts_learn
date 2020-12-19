import { Sorter } from "./Sorter";

export class CharactersCollection extends Sorter {
  constructor(public data: string) {
    super();
  }
  get length(): number {
    return this.data.length;
  }
  compare(i: number, j: number): boolean {
    return this.data[i].localeCompare(this.data[j]) > 0;
  }
  swap(i: number, j: number): void {
    const tmpArray = this.data.split("");
    const tmp = tmpArray[i];
    tmpArray[i] = tmpArray[j];
    tmpArray[j] = tmp;
    this.data = tmpArray.join("");
  }
}
