class SNode {
  // Declaring private fields
  #value;
  #nextNode;

  // Constructor sets the values to null by default
  constructor(value = null) {
    this.#value = value;         // value stored in the node
    this.#nextNode = null;   // pointer to the next node in the linked list
  }
  get value () {
    return this.#value;
  }
  get next () {
    return this.#nextNode;
  }
  set value (value) {
    this.#value = value;
  }
  set next (SNode) {
    this.#nextNode = SNode;
  }
}

export { SNode };