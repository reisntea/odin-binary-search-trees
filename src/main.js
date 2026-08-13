import { Tree } from "./binary-search-tree.js";

const test = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

test.printTree();

console.log(`Includes 67?: ${test.includes(67)}`);
console.log(`Includes 2?: ${test.includes(2)}`);
console.log(`Includes 1?: ${test.includes(1)}`);

console.log("Inserting 1 and 2");
test.insert(1);
test.insert(2);
test.printTree();

console.log("Deleting 1, 67, and 202");
test.deleteItem(1);
test.deleteItem(67);
test.deleteItem(202);
test.printTree();





