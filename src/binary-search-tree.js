import { Node } from "./tree-node.js";

function Tree (array) {

  // Makes the tree using the array argument
  const buildTree = (array) => {
    if (array.length === 0) return null; // In case tree is made without a given array

    let treeRoot = new Node(array[0]); // First value in the array is always going to be the root

    let navRoot; // Used to navigate the tree in the while loop
    for (let i = 1; i < array.length; i++) {
      // check if value is greater than or less than root
      // for whichever check if the child is null
        // if it is set the root's child to be a new node
        // if it isn't null set root to be that value and loop
      
      navRoot = treeRoot;
      
      while (true) {
        if (array[i] < navRoot.value) {
          if (navRoot.left === null) {
            navRoot.left = new Node(array[i]);
            break;
          } else {
            navRoot = navRoot.left;
          }
        } else if (array[i] > navRoot.value) {
          if (navRoot.right === null) {
            navRoot.right = new Node(array[i]);
            break;
          } else {
            navRoot = navRoot.right;
          }
        } else { // Which would happen if it's a duplicate value
          break;
        }
      }
    }

    return treeRoot;
  }

  const printTree = () => {
    prettyPrint(root);
  }

  // Visualizes the tree in a structured format using root of tree
  // Provided by TOP for BST project
  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
      return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }

  const includes = (value, currNode = root) => {
    if (currNode !== null) {
      if (currNode.value === value) {
        return true;
      }
      if (includes(value, currNode.left) || includes(value, currNode.right)) {
        return true;
      }
    }

    return false;
  }

  // Have to put the actual inserting in a separate function so that it can act on the root itself
  // Doing (value, currNode = root) doesn't work on the root, only it's children for some reason 
    // (maybe bc it's a parameter functioning as the root and not the root itself?)
  const insert = (value) => {
    root = insertNode(value, root);
  }

  const insertNode = (value, currNode) => {
    // Once a child with no node is hit it means it's found where to place the value so it returns a newNode
    if (currNode === null) {
      return new Node(value);
    }

    // Recursively go down the tree accordingly
    if (value < currNode.value) {
      currNode.left = insertNode(value, currNode.left);
    } else if (value > currNode.value) {
      currNode.right = insertNode(value, currNode.right);
    }

    return currNode; // If the node isn't null or the value is already in the tree this returns the currNode as is
  }

  // Similarly to insert, doing (value, currNode = root) will not delete the root
  const deleteItem = (value) => {
    root = remove(value, root);
  }

  const remove = (value, currNode) => {
    // Doesn't do anything if it hits a dead end or tree is empty
    if (currNode === null) {
      return;
    }

    // Recursively go down the tree accordingly
    if (value < currNode.value) {
      currNode.left = remove(value, currNode.left);
    } else if (value > currNode.value) {
      currNode.right = remove(value, currNode.right);
    } else { // Means the value to remove was found
      // Follows the rules for removing a value from a BST
      if (currNode.left === null) return currNode.right;
      if (currNode.right === null) return currNode.left;

      let tempNode = currNode.right;
      while (tempNode.left !== null) {
        tempNode = tempNode.left;
      }

      currNode.value = tempNode.value;
      currNode.right = deleteNode(currNode.value, currNode.right);
    }

    return currNode; // If the node isn't what we're removing return node as is

  }

  // Sets root to the treeRoot in build tree
  let root = buildTree(array);

  return { printTree, includes, insert, deleteItem };
}

export { Tree };