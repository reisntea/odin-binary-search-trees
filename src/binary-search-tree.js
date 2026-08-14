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
    if (node === null) {
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
    function insertNode (currNode) {
      // Once a child with no node is hit it means it's found where to place the value so it returns a newNode
      if (currNode === null) {
        return new Node(value);
      }

      // Recursively go down the tree accordingly
      if (value < currNode.value) {
        currNode.left = insertNode(currNode.left);
      } else if (value > currNode.value) {
        currNode.right = insertNode(currNode.right);
      }

      return currNode; // If the node isn't null or the value is already in the tree this returns the currNode as is
    }

    root = insertNode(root);
  }

  // Similarly to insert, doing (value, currNode = root) will not delete the root
  const deleteItem = (value) => {
    function remove (currNode, value) {
      // Doesn't do anything if it hits a dead end or tree is empty
      if (currNode === null) {
        return null;
      }

      // Recursively go down the tree accordingly
      if (value < currNode.value) {
        currNode.left = remove(currNode.left);
      } else if (value > currNode.value) {
        currNode.right = remove(currNode.right);
      } else { // Means the value to remove was found
        // Follows the rules for removing a value from a BST
        if (currNode.left === null) return currNode.right;
        if (currNode.right === null) return currNode.left;

        let tempNode = currNode.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }

        currNode.value = tempNode.value;
        currNode.right = remove(currNode.right, tempNode.value); // Calls remove on itself using its own value to remove its duplicate
      }

      return currNode; // If the node isn't what we're removing return node as is
    }

    root = remove(root, value);
  }

  const levelOrderForEach = (callback) => {
    if (root === null) return;
    if (typeof callback !== "function") throw new TypeError("needs callback function");
    let queue = []; // An array that's acting like a queue
    queue.push(root);

    // loop goes through tree in level order
    // Logic taken from mycodeschool which was provided by TOP
    let currNode;
    while (queue.length !== 0) {
      currNode = queue[0];
      callback(currNode.value);
      if (currNode.left !== null) queue.push(currNode.left);
      if (currNode.right !== null) queue.push(currNode.right);
      queue = queue.slice(1); // Removes first element in array. Using slice for efficiency
    }
  } 

  const inOrderForEach = (callback) => {
    if (root === null) return;
    if (typeof callback !== "function") throw new Error("needs callback function");

    // in order goes left, root, right
    function inOrderTraversal (currNode) {
      if (currNode !== null) {
        inOrderTraversal(currNode.left);
        callback(currNode.value);
        inOrderTraversal(currNode.right);
      }
    } 

    inOrderTraversal(root);
  }

  const preOrderForEach = (callback) => {
    if (root === null) return;
    if (typeof callback !== "function") throw new Error("needs callback function");

    // pre order goes root, left, right
    function preOrderTraversal (currNode) {
      if (currNode !== null) {
        callback(currNode.value);
        preOrderTraversal(currNode.left);
        preOrderTraversal(currNode.right);
      }
    } 

    preOrderTraversal(root);
  }

  const postOrderForEach = (callback) => {
    if (root === null) return;
    if (typeof callback !== "function") throw new Error("needs callback function");

    // pre order goes root, left, right
    function postOrderTraversal (currNode) {
      if (currNode !== null) {
        postOrderTraversal(currNode.left);
        postOrderTraversal(currNode.right);
        callback(currNode.value);
      }
    } 

    postOrderTraversal(root);
  }

  const depth = (value) => {
    if (root === null) return;

    function getDepth(currNode, depth) {
      if (currNode.value === value) {
        return depth;
      }

      if (value < currNode.value) {
        if (currNode.left !== null) return getDepth(currNode.left, depth + 1);
      } else if (value > currNode.value) {
        if (currNode.right !== null) return getDepth(currNode.right, depth + 1);
      }
    }

    return getDepth(root, 0);
  }

  const height = (value) => {
    if (root === null) return;

    // Finds the node that equals the value and returns it
    // If it's not in the tree then it return undefined
    function getNode (currNode) {
      if (value < currNode.value) {
        if (currNode.left !== null) return getNode(currNode.left);
      } else if (value > currNode.value) {
        if (currNode.right !== null) return getNode(currNode.right);
      } else {
        return currNode;
      }
    }

    function getHeight (currNode, currHeight = 0) {
      if (currNode === null) return currHeight - 1; // Removes 1 since null doesn't count but it needs to hit null to know it's reached the end

      const leftHeight = getHeight(currNode.left, currHeight + 1);
      const rightHeight = getHeight(currNode.right, currHeight + 1);
      return leftHeight > rightHeight ? leftHeight : rightHeight; // Returns whichever height is greater
    }

    let currNode = getNode(root);

    return currNode === undefined ? undefined : getHeight(currNode); // Checks if the node exists and if it does returns it's height
  }

  const isBalanced = () => {
    if (root === null) return;

    // A duplicate of the inner function of height is here bc checkBalance uses nodes 
    // and passing the value of the currNode.left so it can use it to find currNode.left is kind of bad
    function getHeight (currNode, currHeight = 0) {
      if (currNode === null) return currHeight - 1; // Removes 1 since null doesn't count but it needs to hit null to know it's reached the end

      const leftHeight = getHeight(currNode.left, currHeight + 1);
      const rightHeight = getHeight(currNode.right, currHeight + 1);
      return leftHeight > rightHeight ? leftHeight : rightHeight; // Returns whichever height is greater
    }

    // For this to work it assumes that if currNode is null then that node is balanced
    function checkBalance (currNode) {
      return (currNode === null) ||
        (height(currNode, 0) === 0) ||
        (checkBalance(currNode.left) &&
        checkBalance(currNode.right) &&
        Math.abs(getHeight(currNode.left) - getHeight(currNode.right)) <= 1);
    }

    return checkBalance(root);
  }

  const rebalance =  () => {
    if (root === null || isBalanced()) return; // Don't do anything if already balanced

    const inOrderArray = [];
    inOrderForEach((value) => {
      inOrderArray.push(value);
    });

    const balancedArray = [];

    // Puts values into balancedArray that will create a balanced tree when the array is fed into buildTree function
    // Uses the In-order traversal and rebuild method to push values
    function makeBalancedArray (start = 0, end = inOrderArray.length - 1) {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);
      balancedArray.push(inOrderArray[mid]);

      makeBalancedArray(start, mid -1);
      makeBalancedArray(mid + 1, end);
    }

    makeBalancedArray();

    root = buildTree(balancedArray);

  }

  // Sets root to the treeRoot in buildTree function
  let root = buildTree(array);

  return { printTree, includes, insert, deleteItem, levelOrderForEach, inOrderForEach, preOrderForEach, postOrderForEach, depth, height, isBalanced, rebalance };
}

export { Tree };