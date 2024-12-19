const traverse = (root, targetSum, selection = [], paths = []) => {
    if (root.left == null && root.right == null && targetSum === root.val) {
        paths.push([...selection, root.val]);
    }

    if (targetSum < 0 || root == null) {
        return false;
    }

    if (root.left) {
        traverse(root.left, targetSum - root.val, [...selection, root.val], paths);
    }

    if (root.right) {
        traverse(root.right, targetSum - root.val, [...selection, root.val], paths);
    }
}

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
    const paths = [];
    traverse(root, targetSum, [], paths);

    return paths;
};

const root = new TreeNode(5,
    new TreeNode(4,
        new TreeNode(11,
            new TreeNode(7),
            new TreeNode(2)),
        new TreeNode(8)),
    new TreeNode(8,
        new TreeNode(13),
        new TreeNode(4,
            new TreeNode(5),
            new TreeNode(1)
        )
    )
);
console.log(pathSum(root, 22));

