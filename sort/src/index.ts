import { CharactersCollection } from "./CharactersCollection";
import { LinkedList } from "./LinkedList";
import { NumbersCollection } from "./NumbersCollection";

const nums = new NumbersCollection([10, -1, 6, 2]);
nums.sort();
console.log(nums.data);

const chars = new CharactersCollection("xXaayx");
chars.sort();
console.log(chars.data);

const list = new LinkedList();
list.add(100);
list.add(-3);
list.add(50);
list.add(0);
list.sort();
list.print();
