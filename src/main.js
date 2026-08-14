import { Tree } from "./binary-search-tree.js";

const test = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 90, 85, 2]);

test.printTree();

console.log(`Includes 67?: ${test.includes(67)}`);
console.log(`Includes 2?: ${test.includes(2)}`);
console.log(`Includes 1?: ${test.includes(1)}`);
console.log(`Includes 10?: ${test.includes(10)}`); // expect false
console.log(`Check balance: ${test.isBalanced()}`); // expect false

console.log("Removing 1 and 23");
test.deleteItem(1);
test.deleteItem(23);
test.printTree();

console.log(`Check balance: ${test.isBalanced()}`); // expect true

const levelOrderArray = [];
test.levelOrderForEach((value) => {
  levelOrderArray.push(value);
});
console.log(`Level Order: ${levelOrderArray.join(", ")}`); // expect level by level

const inOrderArray = [];
test.inOrderForEach((value) => {
  inOrderArray.push(value);
});
console.log(`In Order: ${inOrderArray.join(", ")}`); // expect left, root, right

const preOrderArray = [];
test.preOrderForEach((value) => {
  preOrderArray.push(value);
});
console.log(`PreOrder: ${preOrderArray.join(", ")}`); // expect root, left, right

const postOrderArray = [];
test.postOrderForEach((value) => {
  postOrderArray.push(value);
});
console.log(`PostOrder: ${postOrderArray.join(", ")}`); // expect left, right, root

console.log("Unbalancing tree");
test.insert(200);
test.insert(453);
test.insert(128);
test.insert(529);
test.printTree();
console.log(`Check balance: ${test.isBalanced()}`); // expect false

console.log("Rebalancing tree");
test.rebalance();
test.printTree();
console.log(`Check balance: ${test.isBalanced()}`); // expect true

console.log(`Depth of 4: ${test.depth(4)}`);
console.log(`Depth of 529: ${test.depth(529)}`);

const levelOrderArray2 = [];
test.levelOrderForEach((value) => {
  levelOrderArray2.push(value);
});
console.log(`Level Order: ${levelOrderArray2.join(", ")}`); // expect level by level

const inOrderArray2 = [];
test.inOrderForEach((value) => {
  inOrderArray2.push(value);
});
console.log(`In Order: ${inOrderArray2.join(", ")}`); // expect left, root, right

const preOrderArray2 = [];
test.preOrderForEach((value) => {
  preOrderArray2.push(value);
});
console.log(`PreOrder: ${preOrderArray2.join(", ")}`); // expect root, left, right

const postOrderArray2 = [];
test.postOrderForEach((value) => {
  postOrderArray2.push(value);
});
console.log(`PostOrder: ${postOrderArray2.join(", ")}`); // expect left, right, root
