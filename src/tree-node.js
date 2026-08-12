class Node {
  // Declaring private fields
  #value;
  #leftChild;
  #rightChild;

  // Constructor sets the values to null by default
  constructor(value = null) {
    this.#value = value;        // value stored in the node
    this.#leftChild = null;     // pointer to the left child node in the tree
    this.#leftChild = null;     // pointer to the right child node in the tree
  }
  get value () {
    return this.#value;
  }
  get left () {
    return this.#leftChild;
  }
  get right () {
    return this.#rightChild;
  }
  set value (value) {
    this.#value = value;
  }
  set right (Node) {
    this.#rightChild = Node;
  }
}

export { Node };