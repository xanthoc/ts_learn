import { Sorter } from "./Sorter";

class Node {
  next: Node | null = null;
  constructor(public data: number) {}
}

export class LinkedList extends Sorter {
  head: Node | null = null;
  add(value: number): void {
    const node = new Node(value);
    if (this.head) {
      let tail = this.head;
      while (tail.next) {
        tail = tail.next;
      }
      tail.next = node;
      return;
    }
    this.head = node;
  }
  get length(): number {
    let ans = 0;
    if (this.head) {
      ++ans;
      let tail = this.head;
      while (tail.next) {
        ++ans;
        tail = tail.next;
      }
    }
    return ans;
  }
  at(index: number): Node {
    if (this.head) {
      let tail: Node | null = this.head;
      let counter = 0;
      while (tail) {
        if (counter === index) {
          return tail;
        }
        ++counter;
        tail = tail.next;
      }
    }
    throw new Error("Index out of bounds");
  }
  compare(i: number, j: number): boolean {
    return this.at(i).data > this.at(j).data;
  }
  swap(i: number, j: number): void {
    const left = this.at(i);
    const right = this.at(j);
    const tmp = left.data;
    left.data = right.data;
    right.data = tmp;
  }
  print(): void {
    if (this.head) {
      let tail: Node | null = this.head;
      while (tail) {
        console.log(tail.data);
        tail = tail.next;
      }
    }
  }
}
