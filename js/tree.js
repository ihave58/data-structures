const getIndexOf = (array, value, end, start) => {
    start = start || 0;
    end = end || array.length;

    for(let index = start; index < end; index++) {
        if(array[index] === value) {
            return index;
        }
    }

    return -1;
};

const _buildTreeFromPreOrderAndInOrder = (preOrderArray, inOrderArray) => {
    let rootValue,
        rootIndexInInOrderArray,

        rootNode,
        leftSubTreeRootNode,
        rightSubTreeRootNode;

    if(!preOrderArray.length || !inOrderArray.length) {
        return;
    }

    rootValue = preOrderArray[0];
    rootIndexInInOrderArray = getIndexOf(inOrderArray, rootValue);

    rootNode = new TreeNode(rootValue);

    leftSubTreeRootNode = _buildTreeFromPreOrderAndInOrder(
        preOrderArray.slice(1),
        inOrderArray.slice(0, rootIndexInInOrderArray)
    );

    rightSubTreeRootNode = _buildTreeFromPreOrderAndInOrder(
        preOrderArray.slice(1 + rootIndexInInOrderArray),
        inOrderArray.slice(1 + rootIndexInInOrderArray)
    );

    leftSubTreeRootNode && rootNode.addLeftNode(leftSubTreeRootNode);
    rightSubTreeRootNode && rootNode.addRightNode(rightSubTreeRootNode);

    return rootNode;
};

const _buildTreeFromSerialisedTree = (serialisedTree) => {
    return JSON.parse(serialisedTree);
};

const _traverseNodePreOrderRecursive = (node, array) => {
    if(node) {
        array.push(node.data);
        _traverseNodePreOrderRecursive(node.left, array);
        _traverseNodePreOrderRecursive(node.right, array);
    }
};

const _traverseNodeInOrderRecursive = (node, array) => {
    if(node) {
        _traverseNodeInOrderRecursive(node.left, array);
        array.push(node.data);
        _traverseNodeInOrderRecursive(node.right, array);
    }
};

const _parseDFSRecursive = (node, array) => {
    if(node) {
        array.push(node.data);

        _parseDFSRecursive(node.left, array);
        _parseDFSRecursive(node.right, array);
    }
};

const _computeLeafsLoadRecursive = (node, parentLoad, leafLoads) => {
    if(node) {
        node.load = parentLoad + node.data;

        if(!node.left && !node.right) {
            leafLoads.push(node.load);

        } else {
            _computeLeafsLoadRecursive(node.left, node.load, leafLoads);
            _computeLeafsLoadRecursive(node.right, node.load, leafLoads);
        }
    }
};

const _findLevel = (node, data, level) => {
    let newLevel;

    if(!node) {
        newLevel = -1;
    } else {
        if(node.data === data) {
            newLevel = level;
        } else {
            newLevel = _findLevel(node.left, data, level + 1);

            if(newLevel < 0) {
                newLevel = _findLevel(node.right, data, level + 1);
            }
        }
    }

    return newLevel;
};

const _findLargestButK = (node, visitedCount, k, foundElement) => {
    if(node) {
        _findLargestButK(node.right, visitedCount, k, foundElement);
        visitedCount++;

        if(visitedCount === k) {
            foundElement = node.data;
        }

        _findLargestButK(node.left, visitedCount, k, foundElement);
    }
};

const _findDistances = (root, nodeData1, nodeData2, level, distances) => {
    if(!root) return -1;

    if(root.data === nodeData1) {
        distances.node1Distance = level;

        return root;
    }

    if(root.data === nodeData2) {
        distances.node2Distance = level;

        return root;
    }

    let leftNodeDistance = _findDistances(root.left, nodeData1, nodeData2, level + 1, distances);
    let rightNodeDistance = _findDistances(root.right, nodeData1, nodeData2, level + 1, distances);

    if(leftNodeDistance && rightNodeDistance) {
        distances.distance = (distances.node1Distance + distances.node2Distance) - 2 * level;

        return root;
    }

    return leftNodeDistance ? leftNodeDistance : rightNodeDistance;
};

const _findDistance = (root, node1Data, node2Data) => {
    const distances = {
        node1Distance: -1,
        node2Distance: -1,
        distance: 0
    };

    const lcaNode = _findDistances(root, node1Data, node2Data, 1, distances);

    if((distances.node1Distance >= 0) && (distances.node2Distance >= 0)) {
        return distances.distance;
    }

    if(distances.node1Distance >= 0) {
        return _findLevel(lcaNode, node2Data, 0);
    }

    if(distances.node2Distance >= 0) {
        return _findLevel(lcaNode, node1Data, 0);
    }

    return -1;
};

class TreeNode {
    constructor(data, leftNode, rightNode) {
        this.data = data;

        this.left = leftNode;
        this.right = rightNode;

        this.rightSibling = null;
        this.adjacents = [];
    }

    addLeftNode(node) {
        if(node == null) {
            throw new Error('invalidNode');
        }

        this.left = node;
        this.adjacents.push(node);
    }

    addRightNode(node) {
        if(node == null) {
            throw new Error('invalidNode');
        }

        this.right = node;
        this.adjacents.push(node);
    }

    setRightSibling(node) {
        this.rightSibling = node;
    }

    addNode(node) {
        if(node == null) {
            throw new Error('invalidNode');
        }

        this.adjacents.push(node);
    }
}

class Tree {
    constructor() {
        this.buildTree.apply(this, arguments);
    }

    buildTree() {
        switch(arguments.length) {
            case 1:
                const parsedTree = _buildTreeFromSerialisedTree.apply(null, arguments);
                this.root = parsedTree.root;

                break;

            case 2:
                this.root = _buildTreeFromPreOrderAndInOrder.apply(null, arguments);
                break;
        }
    }

    traversePreOrderRecursive() {
        let oThis = this,
            array = [];

        _traverseNodePreOrderRecursive(oThis.root, array);

        return array;
    }

    traversePreOrderIterative() {
        let oThis = this,
            array = [],
            stack = new Stack(),
            node = oThis.root;

        while(!stack.isEmpty() || node) {
            if(node) {
                array.push(node.data);

                if(node.right) {
                    stack.push(node.right);
                }

                node = node.left;
            } else {
                node = stack.pop();
            }
        }

        return array;
    }

    traverseInOrderRecursive() {
        let oThis = this,
            array = [];

        _traverseNodeInOrderRecursive(oThis.root, array);

        return array;
    }

    traverseInOrderIterative() {
        let oThis = this,
            array = [],
            stack = new Stack(),
            node = oThis.root;

        while(!stack.isEmpty() || node) {
            if(node) {
                stack.push(node);
                node = node.left;
            } else {
                node = stack.pop();
                array.push(node.data);
                node = node.right;
            }
        }

        return array;
    }

    parseDFSRecursive() {
        let oThis = this,
            array = [];

        _parseDFSRecursive(oThis.root, array);

        return array;
    }

    parseLevelOrder() {
        let oThis = this,
            array = [],
            queue = new Queue(),
            node;

        queue.enqueue(oThis.root);
        while(!queue.isEmpty()) {
            node = queue.dequeue();

            if(node.left) {
                queue.enqueue(node.left);
            }

            if(node.right) {
                queue.enqueue(node.right);
            }

            array.push(node.data);
        }

        return array;
    }

    parseBFSIterativeSpirallyStacks() {
        let oThis = this,
            array = [],
            stack1 = new Stack(),
            stack2 = new Stack(),
            node;

        stack1.push(oThis.root);
        while(!stack1.isEmpty() || !stack2.isEmpty()) {
            while(!stack1.isEmpty()) {
                node = stack1.pop();

                if(node) {
                    array.push(node.data);

                    stack2.push(node.right);
                    stack2.push(node.left);
                }
            }

            while(!stack2.isEmpty()) {
                node = stack2.pop();

                if(node) {
                    array.push(node.data);

                    stack1.push(node.left);
                    stack1.push(node.right);
                }
            }
        }

        return array;
    }

    computeLeafsLoadRecursive() {
        let oThis = this,
            leafLoads = [];

        _computeLeafsLoadRecursive(oThis.root, 0, leafLoads);

        return leafLoads.reduce(function(prevReduce, curr) {
            return (prevReduce + curr);
        });
    }

    computeLeafsLoadIterative() {
        let oThis = this,
            stack = new Stack(),
            node = oThis.root,
            parentLoad,
            leafLoads = [];

        node.load = node.data;
        while(!stack.isEmpty() || node) {
            if(node) {
                parentLoad = node.load;
                stack.push(node);

                node = node.left;
                if(node) {
                    node.load = parentLoad + node.data;
                }
            } else {
                node = stack.pop();
                if(!node.left && !node.right) {
                    leafLoads.push(node.load);
                }

                parentLoad = node.load;
                node = node.right;
                if(node) {
                    node.load = parentLoad + node.data;
                    parentLoad = node.load;
                }
            }
        }

        return leafLoads.reduce(function(prev, curr) {
            return (prev + curr);
        });
    }

    isComplete() {
        let oThis = this,
            queue = new Queue(),
            node;

        queue.enqueue(oThis.root);
        while(!queue.isEmpty()) {
            node = queue.dequeue();

            if(node) {
                if(!node.left && node.right) {
                    return false;
                }

                queue.enqueue(node.left);
                queue.enqueue(node.right);
            }
        }

        return true;
    }

    findLargestButK() {
        let oThis = this,
            foundElement;

        _findLargestButK(oThis.root, 0, 3, foundElement);

        return foundElement;
    }

    connectLeftToRightNodes() {
        let oThis = this,
            queue = new Queue(),
            node;

        queue.enqueue(oThis.root);
        queue.enqueue(null);

        while(!queue.isEmpty()) {
            node = queue.dequeue();

            if(node) {
                node.setRightSibling(queue.peek());

                if(node.left) {
                    queue.enqueue(node.left);
                }

                if(node.right) {
                    queue.enqueue(node.right);
                }
            } else {
                if(queue.peek()) {
                    queue.enqueue(null);
                }
            }
        }
    }

    findLevel(data) {
        return _findLevel(this.root, data, 0);
    }

    findDistance(node1Data, node2Data) {
        const distances = {
            node1Distance: -1,
            node2Distance: -1,
            distance: 0
        };

        return _findDistance(this.root, node1Data, node2Data, 1, distances);
    }
}
