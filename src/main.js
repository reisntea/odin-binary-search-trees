import { linkedList } from "./linked-list.js";

const list = linkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
list.prepend("eagle");

console.log(list.toString());
console.log(`Size: ${list.size()}`);
console.log(`Head: ${list.getHead()}`);
console.log(`Tail: ${list.getTail()}`);
console.log(`Index 5: ${list.at(5)}`);
console.log(`Popping: ${list.pop()}`);
console.log(list.toString());
console.log(`Contains turtle?: ${list.contains("turtle")}`);
console.log(`Contains hamster?: ${list.contains("hamster")}`);
console.log(`Contains eagle?: ${list.contains("eagle")}`);
console.log(`Snake index: ${list.findIndex("snake")}`);


