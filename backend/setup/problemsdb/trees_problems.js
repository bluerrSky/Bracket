const problems = [
  {
    problem_id: 30,
    category: 'Trees',
    title: 'Tree Height',
    description: `
You are given a tree with n nodes. Your task is to find its height.
The height of a tree is the length of the longest path from the root to a leaf.

### Input
The first line contains integer n.
Next line contains n integers representing the parent of each node (-1 for root).

### Output
Print the height of the tree.

### Constraints
1 <= n <= 2*10^5
-1 <= parent_i <= n-1

### Example
**Input:**
\`\`\`
5
4 -1 4 1 1
\`\`\`
**Output:**
\`\`\`
3
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 31,
    category: 'Trees',
    title: 'Number of Leaf Nodes',
    description: `
Given a tree with n nodes, find the number of leaves (nodes with no children).

### Input
First line integer n.
Next line has n integers representing parents (-1 for root).

### Output
Print the count of leaf nodes.

### Constraints
1 <= n <= 2*10^5

### Example
**Input:**
\`\`\`
5
-1 0 0 1 1
\`\`\`
**Output:**
\`\`\`
3
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 32,
    category: 'Trees',
    title: 'LCA (Lowest Common Ancestor)',
    description: `
Given a rooted tree with n nodes and q queries.
Queries ask for the lowest common ancestor of two nodes.

### Input
First line: n and q.
Next n-1 lines: edges.
Next q lines: two nodes to find LCA.

### Output
For each query, print the LCA.

### Constraints
1 <= n, q <= 2*10^5

### Example
**Input:**
\`\`\`
5 2
1 2
1 3
3 4
3 5
4 5
2 4
\`\`\`
**Output:**
\`\`\`
3
1
\`\`\`
`,
    difficulty: 'Hard',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 33,
    category: 'Trees',
    title: 'Diameter of Tree',
    description: `
Find the diameter (longest path) of a tree.

### Input
First line integer n.
Next n-1 lines: edges.

### Output
Print the diameter length.

### Constraints
1 <= n <= 10^5

### Example
**Input:**
\`\`\`
4
1 2
2 3
3 4
\`\`\`
**Output:**
\`\`\`
3
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 34,
    category: 'Trees',
    title: 'Rooted Tree Distances',
    description: `
Given a rooted tree, find distances from the root to every other node.

### Input
First line n.
Next n-1 lines: edges.

### Output
Print distances from root (node 1).

### Constraints
1 <= n <= 2*10^5

### Example
**Input:**
\`\`\`
5
1 2
1 3
3 4
3 5
\`\`\`
**Output:**
\`\`\`
0 1 1 2 2
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 35,
    category: 'Trees',
    title: 'Counting Subtrees',
    description: `
Count the number of subtrees in a tree that have a certain property (e.g., even number of nodes).

### Input
First line: n.
Next n-1 lines: edges.

### Output
Print the number of such subtrees.

### Constraints
1 <= n <= 10^5

### Example
**Input:**
\`\`\`
6
1 2
1 3
2 4
2 5
3 6
\`\`\`
**Output:**
\`\`\`
3
\`\`\`
`,
    difficulty: 'Hard',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 36,
    category: 'Trees',
    title: 'Check if Binary Tree Is BST',
    description: `
Given a binary tree represented by its nodes, determine if it is a Binary Search Tree.

### Input
First line integer n.
Next n lines: node value and its children.

### Output
Print "YES" or "NO".

### Constraints
1 <= n <= 10^5

### Example
**Input:**
\`\`\`
3
2 1 3
1 -1 -1
3 -1 -1
\`\`\`
**Output:**
\`\`\`
YES
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 37,
    category: 'Trees',
    title: 'Count Nodes at Distance K',
    description: `
Given a tree and a node, count how many nodes are at distance k from that node.

### Input
First line has n and q.
Next n-1 lines: edges.
Next q lines: node and k.

### Output
Print counts for each query.

### Constraints
1 <= n, q <= 10^5

### Example
**Input:**
\`\`\`
5 2
1 2
1 3
3 4
3 5
1 2
3 1
\`\`\`
**Output:**
\`\`\`
2
3
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 38,
    category: 'Trees',
    title: 'Serialize and Deserialize Binary Tree',
    description: `
Write functions to serialize a binary tree to a string and deserialize it back, verifying correct restoration.

### Input
Description of a binary tree.

### Output
Output of serialization and verification.

### Constraints
Tree size up to 10^4 nodes.

### Example
**Input:**
\`\`\`
[Serialized format or tree description]
\`\`\`
**Output:**
\`\`\`
[Verification output]
\`\`\`
`,
    difficulty: 'Hard',
    time_limit: 1,
    memory_limit: 524288
  },
  {
  problem_id: 73,
  category: 'Trees',
  title: 'Inorder Traversal',
  description: `
You are given the root of a binary tree. Your task is to print its inorder traversal (Left → Root → Right).

### Input
A binary tree is given as a level-order array representation (use null for empty nodes).

### Output
Print the inorder traversal as a list.

### Constraints
1 <= number of nodes <= 10^5
-10^9 <= node_value <= 10^9

### Example
**Input:**
\`\`\`
[1,null,2,3]
\`\`\`
**Output:**
\`\`\`
[1,3,2]
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 524288
},


{
  problem_id: 74,
  category: 'Trees',
  title: 'Preorder Traversal',
  description: `
You are given the root of a binary tree. Your task is to print its preorder traversal (Root → Left → Right).

### Input
A binary tree is given as a level-order array representation (use null for empty nodes).

### Output
Print the preorder traversal as a list.

### Constraints
1 <= number of nodes <= 10^5
-10^9 <= node_value <= 10^9

### Example
**Input:**
\`\`\`
[1,null,2,3]
\`\`\`
**Output:**
\`\`\`
[1,2,3]
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 524288
},


{
  problem_id: 75,
  category: 'Trees',
  title: 'Postorder Traversal',
  description: `
You are given the root of a binary tree. Your task is to print its postorder traversal (Left → Right → Root).

### Input
A binary tree is given as a level-order array representation (use null for empty nodes).

### Output
Print the postorder traversal as a list.

### Constraints
1 <= number of nodes <= 10^5
-10^9 <= node_value <= 10^9

### Example
**Input:**
\`\`\`
[1,null,2,3]
\`\`\`
**Output:**
\`\`\`
[3,2,1]
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 524288
},


{
  problem_id: 76,
  category: 'Trees',
  title: 'Count Leaf Nodes',
  description: `
You are given a binary tree. Your task is to count the number of leaf nodes (nodes with no children).

### Input
A binary tree is given as a level-order array representation (use null for empty nodes).

### Output
Print the number of leaf nodes.

### Constraints
1 <= number of nodes <= 10^5
-10^9 <= node_value <= 10^9

### Example
**Input:**
\`\`\`
[1,2,3,4,5,null,6]
\`\`\`
**Output:**
\`\`\`
3
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 524288
},


{
  problem_id: 77,
  category: 'Trees',
  title: 'Sum of All Nodes',
  description: `
You are given a binary tree. Your task is to find the sum of all node values.

### Input
A binary tree is given as a level-order array representation (use null for empty nodes).

### Output
Print one integer: the sum of all nodes.

### Constraints
1 <= number of nodes <= 10^5
-10^9 <= node_value <= 10^9

### Example
**Input:**
\`\`\`
[5,3,8,1,4,7,9]
\`\`\`
**Output:**
\`\`\`
37
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 524288
},

{
  problem_id: 78,
  category: 'Trees',
  title: 'Level Order Traversal',
  description: `
You are given the root of a binary tree. Your task is to return its level order traversal — the values of the nodes level by level, from left to right.

### Input
A binary tree is given as a level-order array representation (use null for empty nodes).

### Output
Print a list of lists, where each list contains the values of one level.

### Constraints
1 <= number of nodes <= 10^5
-10^9 <= node_value <= 10^9

### Example
**Input:**
\`\`\`
[3,9,20,null,null,15,7]
\`\`\`
**Output:**
\`\`\`
[[3],[9,20],[15,7]]
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 524288
},


{
  problem_id: 79,
  category: 'Trees',
  title: 'Check Balanced Binary Tree',
  description: `
You are given the root of a binary tree. A binary tree is balanced if, for every node, the height difference between its left and right subtree is at most 1.
Your task is to check if the given tree is balanced.

### Input
A binary tree is given as a level-order array representation (use null for empty nodes).

### Output
Print "true" if the tree is balanced, otherwise print "false".

### Constraints
1 <= number of nodes <= 10^5
-10^9 <= node_value <= 10^9

### Example
**Input:**
\`\`\`
[3,9,20,null,null,15,7]
\`\`\`
**Output:**
\`\`\`
true
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 524288
},


{
  problem_id: 80,
  category: 'Trees',
  title: 'Sum of Nodes at Kth Level',
  description: `
You are given a binary tree and an integer K. Your task is to find the sum of all nodes present at level K (root is level 0).

### Input
A binary tree is given as a level-order array representation (use null for empty nodes), followed by integer K.

### Output
Print one integer: the sum of all nodes at level K.

### Constraints
1 <= number of nodes <= 10^5
0 <= K <= 10^5
-10^9 <= node_value <= 10^9

### Example
**Input:**
\`\`\`
[1,2,3,4,5,6,7]
2
\`\`\`
**Output:**
\`\`\`
22
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 524288
},


{
  problem_id: 81,
  category: 'Trees',
  title: 'Mirror of Binary Tree',
  description: `
You are given the root of a binary tree. Your task is to print the mirror of the given tree.
The mirror of a binary tree is obtained by swapping the left and right children of all nodes.

### Input
A binary tree is given as a level-order array representation (use null for empty nodes).

### Output
Print the level-order traversal of the mirrored tree.

### Constraints
1 <= number of nodes <= 10^5
-10^9 <= node_value <= 10^9

### Example
**Input:**
\`\`\`
[1,2,3,4,5,6,7]
\`\`\`
**Output:**
\`\`\`
[1,3,2,7,6,5,4]
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 524288
},


{
  problem_id: 82,
  category: 'Trees',
  title: 'Sum of Left Leaves',
  description: `
You are given the root of a binary tree. Your task is to find the sum of all left leaf nodes (a leaf is a node with no children, and it is considered left if it is the left child of its parent).

### Input
A binary tree is given as a level-order array representation (use null for empty nodes).

### Output
Print one integer: the sum of all left leaves.

### Constraints
1 <= number of nodes <= 10^5
-10^9 <= node_value <= 10^9

### Example
**Input:**
\`\`\`
[3,9,20,null,null,15,7]
\`\`\`
**Output:**
\`\`\`
24
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 524288
},



];

module.exports = { problems };
