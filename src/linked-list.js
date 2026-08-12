import { SNode } from "./singly-node.js";

function linkedList () {
  let head = null;

  const append = (value) => {
    if (head === null) {
      head = new SNode (value);
    } else {
      let current = head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = new SNode (value);
    }
  }

  const prepend = (value) => {
    let temp = new SNode (value);
    temp.next = head;
    head = temp;
  }

  const size = () => {
    if (head === null) return 0;
    let current = head;
    let count = 1;
    while (current.next !== null) {
      current = current.next;
      count++;
    }
    return count;
  }

  const getHead = () => {
    return head === null ?  undefined : head.value;
  }

  const getTail = () => {
    if (head === null) return undefined;
    let current = head;
    while (current.next !== null) {
      current = current.next;
    }
    return current.value;
  }

  const at = (index) => {
    if (head === null) return undefined;
    let current = head;
    for (let i = 0; i < index; i++) {
      if (current.value === null) return undefined;
      current = current.next;
    }
    return current.value;
  }

  const pop = () => {
    if (head === null) return undefined;
    let current = head;
    let prev = null
    while (current.next !== null) {
      prev = current;
      current = current.next;
    }
    prev.next = null;
    return current.value;
  }

  const contains = (value) => {
    if (head === null) return false;
    let current = head;
    if (current.value === value) return true;
    while (current.next !== null) {
      current = current.next;
      if (current.value === value) return true;
    }
    return false;
  }

  const findIndex = (value) => {
    if (head === null) return false;
    let current = head;
    let count = 0;
    if (current.value === value) return count;
    while (current.next !== null) {
      current = current.next;
      count++;
      if (current.value === value) return count;
    }
    return -1;
  }

  const toString = () => {
    if (head === null) return "null";
    let current = head;
    let listString = `( ${current.value} )`;
    while (current.next !== null) {
      listString = listString + ` -> ( ${current.next.value} )`
      current = current.next;
    }
    listString = listString + ` -> null`;
    return listString;
  }

  return { append, prepend, size, getHead, getTail, at, pop, contains, findIndex, toString };
}

export { linkedList };